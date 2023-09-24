using NSwag;
using NSwag.Generation.Processors.Security;
using Aria.Database.Entities;
using BC = BCrypt.Net.BCrypt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Aria.Server.DTO.Actions;
using Aria.Server.DTO.Models;
using System.Security.Cryptography;


var builder = WebApplication.CreateBuilder(args);

// Add API Explorer to enable NSwag
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<AriaContext>();

// Register NSwag services before building the app
builder.Services.AddOpenApiDocument(document =>
{
    document.Title = "My API";
    document.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
    {
        Type = OpenApiSecuritySchemeType.ApiKey,
        Name = "Authorization",
        In = OpenApiSecurityApiKeyLocation.Header,
        Description = "Copy 'Bearer ' + valid JWT token into field"
    });
    document.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));
});

// Setup JWT
var jwt = new JwtSettings();
builder.Configuration.Bind(nameof(JwtSettings), jwt);
builder.Services.AddSingleton(jwt);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = jwt.Issuer,
        ValidateAudience = true,
        ValidAudience = jwt.Audience,
        ValidateLifetime = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwt.Key)),
        ValidateIssuerSigningKey = true,
    };
});

builder.Services.AddAuthorization();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseAuthentication();
app.UseAuthorization();



app.MapPost("/users", async (JwtSettings jwt, RegisterUser newUser, AriaContext db) =>
{
    var hashedPassword = BC.HashPassword(newUser.Password);

    var user = new User
    {
        Username = newUser.Username,
        Email = newUser.Email,
        HashedPassword = hashedPassword
    };


    db.Users.Add(user);

    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.ASCII.GetBytes(jwt.Key);
    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
        Issuer = jwt.Issuer,
        Audience = jwt.Audience,
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
    };
    var token = tokenHandler.CreateToken(tokenDescriptor);
    var tokenString = tokenHandler.WriteToken(token);
    var authenticatedUser = new AuthenticatedUser
    {
        Username = user.Username,
        Id = user.Id,
        Token = tokenString
    };

    await db.SaveChangesAsync();

    return Results.Created($"/users/${user.Id}", authenticatedUser);
});

app.UseOpenApi();
app.UseSwaggerUi3();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AriaContext>();
    context.Database.EnsureCreated();
}

app.Run();
