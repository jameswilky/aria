using NSwag;
using NSwag.Generation.Processors.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Aria.Server.Configuration;
using Aria.Database.Contexts;
using Aria.Server.Models;
using Aria.Server.Services;

namespace Aria.Server.Configuration;

public static class WebApplicationBuilderExtensions
{

    public static WebApplicationBuilder AddInMemoryDatabaseService(this WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton(serviceProvider =>
        {
            var optionsBuilder = new DbContextOptionsBuilder<AriaDbContext>();
            optionsBuilder.UseSqlite("Data Source=AriaDb;Mode=Memory");

            return new AriaDbContext(optionsBuilder.Options);
        });

        return builder;
    }
    public static WebApplicationBuilder AddDatabaseService(this WebApplicationBuilder builder)
    {
        var connectionString = builder.Configuration.GetConnectionString("AriaDatabase");

        if (connectionString == null)
        {
            throw new Exception("No connection string supplied in appsettings.json for ConnectionStrings.AriaDatabase");
        }
        builder.Services.AddDbContext<AriaDbContext>(options =>
            options.UseSqlite(connectionString));
        return builder;
    }
    public static WebApplicationBuilder AddServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddTransient<UserService>();

        // Register NSwag services before building the app
        builder.Services.AddOpenApiDocument(document =>
        {
            document.Title = "Aria";
            document.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
            {
                Type = OpenApiSecuritySchemeType.ApiKey,
                Name = "Authorization",
                In = OpenApiSecurityApiKeyLocation.Header,
                Description = "Copy 'Bearer ' + valid JWT token into field"
            });
            document.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));
        });

        // Setup auth
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
        builder.Services.AddControllers();

        return builder;
    }
}