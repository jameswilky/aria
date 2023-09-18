using NSwag;
using NSwag.Generation.Processors.Security;


var builder = WebApplication.CreateBuilder(args);

// Add API Explorer to enable NSwag
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<MyDbContext>();

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


app.MapGet("/people", (MyDbContext db) =>
{
    return db.People.ToList();
});

app.UseOpenApi();
app.UseSwaggerUi3();


using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<MyDbContext>();
    context.Database.EnsureCreated();
}


app.Run();

var p = new Person();

