
using NSwag;
using NSwag.Generation.Processors.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Aria.Database.Contexts;
using Microsoft.EntityFrameworkCore;
using Aria.Server.Configuration;


namespace Aria.Server.Configuration;
public static class WebApplicationExtensions
{
    public static WebApplication UseMiddleware(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseAuthentication();
        app.UseAuthorization();
        app.UseOpenApi();
        app.UseSwaggerUi3();
        app.MapControllers();

        return app;
    }
    public static WebApplication InitializeDatabase(this WebApplication app)
    {
        using (var scope = app.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var context = services.GetRequiredService<AriaDbContext>();
            context.Database.EnsureCreated();
        }

        return app;
    }

    public static WebApplication InitializeInMemoryDatabase(this WebApplication app)
    {
        using (var scope = app.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var context = services.GetRequiredService<AriaDbContext>();
            var connection = context.Database.GetDbConnection();
            connection.Open();
            var script = File.ReadAllText("./../../../../Aria.Database/tables.sql");
            context.Database.ExecuteSqlRaw(script);
        }
        return app;
    }
}