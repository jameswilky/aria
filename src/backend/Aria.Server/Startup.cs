using NSwag;
using NSwag.Generation.Processors.Security;
using Aria.Database.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Aria.Server.Services.UserService;
using Microsoft.EntityFrameworkCore;

namespace Aria.Server;

public class Startup
{
    private readonly IConfiguration _config;

    public Startup(IConfiguration config)
    {
        _config = config;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        // Add API Explorer to enable NSwag
        services.AddEndpointsApiExplorer();

        var connectionString = _config.GetConnectionString("DefaultConnection");
        // Add Services
        services.AddDbContext<AriaContext>(options => options.UseSqlite(connectionString));

        services.AddTransient<UserService>();

        // Register NSwag services before building the app
        services.AddOpenApiDocument(document =>
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
        _config.Bind(nameof(JwtSettings), jwt);
        services.AddSingleton(jwt);
        services.AddAuthentication(options =>
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

        services.AddAuthorization();
        services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();
        app.UseOpenApi();
        app.UseSwaggerUi3();
        app.UseEndpoints(endpoints => { endpoints.MapDefaultControllerRoute(); });

        //CreateDbScope(app);
    }


    private static void CreateDbScope(IApplicationBuilder app)
    {
        using (var scope = app.ApplicationServices.CreateScope())
        {
            var services = scope.ServiceProvider;
            var context = services.GetRequiredService<AriaContext>();
            context.Database.EnsureCreated();
        }
    }
}
