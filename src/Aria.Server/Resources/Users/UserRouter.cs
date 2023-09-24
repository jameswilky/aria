using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Aria.Database.Entities;
using Aria.Server.DTO.Actions;
using Aria.Server.DTO.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using BC = BCrypt.Net.BCrypt;

namespace Aria.Server.Resources.Users
{
    public static class UserRouter
    {
        public static void Map(WebApplication app)
        {
            app.MapPost("/users", async (JwtSettings jwt, AriaContext db, RegisterUser request) =>
            {
                var authenticatedUser = await CreateUser(jwt, request, db);
                return Results.Created($"/users/${authenticatedUser.Id}", authenticatedUser);
            });

            app.MapPost("/auth/signin", async (JwtSettings jwt, AriaContext db, AuthenticateUser request) =>
            {
                var authenticatedUser = await GetUser(jwt, db, request);
                if (authenticatedUser != null)
                {
                    return Results.Ok(authenticatedUser);
                }
                return Results.BadRequest(new { message = "Invalid username or password" });
            });
        }

        private static string GenerateToken(JwtSettings jwt, long id)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwt.Key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", id.ToString()) }),
                Issuer = jwt.Issuer,
                Audience = jwt.Audience,
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private static async Task<AuthenticatedUser?> GetUser(JwtSettings jwt, AriaContext db, AuthenticateUser request)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null || !BC.Verify(request.Password, user.HashedPassword))
            {
                // TODO throw exception
                return null;
            }

            var token = GenerateToken(jwt, user.Id);

            return new AuthenticatedUser
            {
                Username = user.Username,
                Id = user.Id,
                Token = token
            };
        }

        private static async Task<AuthenticatedUser> CreateUser(JwtSettings jwt, RegisterUser newUser, AriaContext db)
        {
            var hashedPassword = BC.HashPassword(newUser.Password);

            var user = new User
            {
                Username = newUser.Username,
                Email = newUser.Email,
                HashedPassword = hashedPassword
            };

            db.Users.Add(user);
            await db.SaveChangesAsync();

            var token = GenerateToken(jwt, user.Id);

            return new AuthenticatedUser
            {
                Username = user.Username,
                Id = user.Id,
                Token = token
            };
        }
    }
}
