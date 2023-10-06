using Aria.Server;
using Aria.Server.Configuration;

var builder = WebApplication.CreateBuilder(args);
builder.AddDatabaseService();
builder.AddServices();
var app = builder.Build();
app.UseMiddleware();
app.InitializeDatabase();
app.Run();
