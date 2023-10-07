using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Runtime.InteropServices;
using Aria.Server.DTO.Actions;
using Aria.Server.DTO.Models;
using Aria.Server.Tests.Helpers;
using FluentAssertions;
using YamlDotNet.Core.Tokens;

namespace Aria.Server.Tests;

public class SignInTests : IDisposable
{
    private readonly HttpClient _client = new TestServerFactory().CreateClient();

    [Fact]
    public async Task SignIn_WithValidInputs()
    { 
        // Arrange
        await _client.SendAsync(new HttpRequestMessage(HttpMethod.Post, "/users")
        {
            Content = JsonContent.Create(new AddUser
            {
                Username = "john",
                Email = "john@gmail.com",
                Password = "john_password"
            })
        });
        
        var request = new HttpRequestMessage(HttpMethod.Post, "/auth")
        {
            Content = JsonContent.Create(new AuthenticateUser
            {
                Username = "john",
                Password = "john_password"
            })
        };
        
        // Act
        var response = await _client.SendAsync(request);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var content = await response.Content.ReadFromJsonAsync<AuthenticatedUser>();
        content.Id.Should().BeGreaterThan(0);
        content.Username.Should().Be("john");
        content.Token.Should().NotBeEmpty();
    }
    
    [Theory]
    [InlineData("john", "wrong password", HttpStatusCode.Unauthorized)]
    [InlineData("james", "john_password",HttpStatusCode.Unauthorized)]
    [InlineData("", "", HttpStatusCode.BadRequest)]
    [InlineData("john", null,HttpStatusCode.BadRequest)]
    [InlineData(null, "john_password",HttpStatusCode.BadRequest)]
    public async Task SignIn_WithInValidInputs(string username, string password, HttpStatusCode statusCode)
    { 
        // Arrange
        await _client.SendAsync(new HttpRequestMessage(HttpMethod.Post, "/users")
        {
            Content = JsonContent.Create(new AddUser
            {
                Username = "john",
                Email = "john@gmail.com",
                Password = "john_password"
            })
        });
        
        var request = new HttpRequestMessage(HttpMethod.Post, "/auth")
        {
            Content = JsonContent.Create(new AuthenticateUser
            {
                Username = username,
                Password = password
            })
        };
        
        // Act
        var response = await _client.SendAsync(request);

        // Assert
        response.StatusCode.Should().Be(statusCode);
    }
    
   
    public void Dispose()
    {
        _client.Dispose();
    }
}