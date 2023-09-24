using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Aria.Database.Entities;
using Aria.Server.DTO.Actions;
using Aria.Server.DTO.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using BC = BCrypt.Net.BCrypt;

namespace Aria.Server.Services.UserService
{
    public class UserService
    {
        private readonly AriaContext _db;
        private readonly JwtSettings _jwt;

        public UserService(AriaContext db, JwtSettings jwt)
        {
            _db = db;
            _jwt = jwt;
        }

        string GenerateToken(long id)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwt.Key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", id.ToString()) }),
                Issuer = _jwt.Issuer,
                Audience = _jwt.Audience,
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<AuthenticatedUser?> GetUser(AuthenticateUser request)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null || !BC.Verify(request.Password, user.HashedPassword))
            {
                // TODO throw exception
                return null;
            }

            var token = GenerateToken(user.Id);

            return new AuthenticatedUser
            {
                Username = user.Username,
                Id = user.Id,
                Token = token
            };
        }

        public async Task<AuthenticatedUser> CreateUser(RegisterUser newUser)
        {
            var hashedPassword = BC.HashPassword(newUser.Password);

            var user = new User
            {
                Username = newUser.Username,
                Email = newUser.Email,
                HashedPassword = hashedPassword
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            var token = GenerateToken(user.Id);

            return new AuthenticatedUser
            {
                Username = user.Username,
                Id = user.Id,
                Token = token
            };
        }

        public async Task<Profile?> GetProfile(long id)
        {
            var user = await _db.Users.FindAsync(id);

            if (user == null) return null;

            return new Profile
            {
                Username = user.Username,
                Id = user.Id
            };
        }
    }
}
