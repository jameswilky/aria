using System.Net;
using System.Net.Http.Json;
using Aria.Server.DTO.Actions;
using Aria.Server.DTO.Models;
using Aria.Server.Tests.Helpers;
using FluentAssertions;

namespace Aria.Server.Tests;

public class AddUserTests : IDisposable
{
    private readonly HttpClient _client = new TestServerFactory().CreateClient();

    [Fact]
    public async Task AddUser_WithValidInputs()
    { 
        // Arrange
        var request = new HttpRequestMessage(HttpMethod.Post, "/users")
        {
            Content = JsonContent.Create(new AddUser()
            {
                Username = "john", 
                Email = "john@gmail.com", 
                Password = "john_password"
            })
        };
        
        // Act
        var response = await _client.SendAsync(request);
        
        // Assert
        response.StatusCode.Should().Be((HttpStatusCode)201);
        var responseContent = await response.Content.ReadFromJsonAsync<AuthenticatedUser>();
        responseContent.Id.Should().BeGreaterThan(0);
        responseContent.Username.Should().Be("john");
        responseContent.Token.Should().NotBeEmpty();
    }
    
    [Theory]
    [InlineData("john",null, "john_password")]
    [InlineData(null,null, "john_password")]
    [InlineData(null,"john@gmail.com", "john_password")]
    [InlineData("john","john@gmail.com", null)]
    [InlineData(null,null, null)]
    [InlineData("1823740198234","john@gmail.com", "john_password")]
    [InlineData("","", "")]
    [InlineData("john","john@gmail.com", "short")]
    [InlineData("john","notanemail", "john_password")]
    public async Task AddUser_WithInvalidInputs(string username, string email, string password)
    { 
        // Arrange
        var request = new HttpRequestMessage(HttpMethod.Post, "/users")
        {
            Content = JsonContent.Create(new AddUser()
            {
                Username = username,
                Email = email, 
                Password = password
            })
        };
        
        // Act
        var response = await _client.SendAsync(request);

        // Assert
        response.StatusCode.Should().Be((HttpStatusCode)400);
    }
    
    [Fact]
    public async Task AddUser_ThatAlreadyExists()
    { 
        // Arrange
        var preRequest = new HttpRequestMessage(HttpMethod.Post, "/users")
        {
            Content = JsonContent.Create(new AddUser()
            {
                Username = "john", 
                Email = "john@gmail.com", 
                Password = "john_password"
            })
        };
       await _client.SendAsync(preRequest);
       
       var request = new HttpRequestMessage(HttpMethod.Post, "/users")
       {
           Content = JsonContent.Create(new AddUser()
           {
               Username = "john", 
               Email = "john@gmail.com", 
               Password = "john_password"
           })
       };
        
        // Act
        var response = await _client.SendAsync(request);
        
        // Assert
        response.StatusCode.Should().Be((HttpStatusCode)409);
    }
    
    
    public void Dispose()
    {
        _client.Dispose();
    }
}