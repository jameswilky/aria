using Aria.Server;
using Aria.Server.Configuration;

namespace Aria.Server.TestServer;

public class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.AddInMemoryDatabaseService();
        builder.AddServices();
        var app = builder.Build();
        app.UseMiddleware();
        app.InitializeInMemoryDatabase();
        app.Run();
    }
}

