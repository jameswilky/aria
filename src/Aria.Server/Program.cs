using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using NSwag;
using NSwag.Generation.Processors.Security;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);

// Add API Explorer to enable NSwag
builder.Services.AddEndpointsApiExplorer();

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

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.MapGet("/people", () => new Person { Name = "John", Age = 30 });

app.UseOpenApi();
app.UseSwaggerUi3();

app.Run();

public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}