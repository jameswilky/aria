using NSwag;
using NSwag.Generation.Processors.Security;
using Aria.Database.Entities;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Aria.Server.Services.UserService;

WebApplication Build(WebApplicationBuilder builder)
{
    // Add API Explorer to enable NSwag
    builder.Services.AddEndpointsApiExplorer();

    // Add Services
    builder.Services.AddDbContext<AriaContext>();
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

    return builder.Build();
}

void UseMiddleware(WebApplication app)
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
}

void CreateDbScope(WebApplication app)
{
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        var context = services.GetRequiredService<AriaContext>();
        context.Database.EnsureCreated();
    }
}

var builder = WebApplication.CreateBuilder(args);
var app = Build(builder);
UseMiddleware(app);
CreateDbScope(app);
app.Run();
