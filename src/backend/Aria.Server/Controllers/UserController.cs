using Aria.Server.DTO.Actions;
using Aria.Server.DTO.Models;
using Aria.Server.Middleware;
using Aria.Server.Models.Errors;
using Aria.Server.Services;
using Microsoft.AspNetCore.Mvc;
using OneOf.Linq;
using OneOf.Types;
using OneOf;

public class TestClass
{
    
}

namespace Aria.Server.Controllers
{
    [ApiController]
    [Route("/users")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }
 
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(AuthenticatedUser))] // Needed for nswag to work correctly
        public async Task<IActionResult> Create(AddUser request)
        {
            var result = await _userService.CreateUser(request);

            return result.Value switch
            {
                AuthenticatedUser authenticatedUser => Created($"/users/{authenticatedUser.Id}", authenticatedUser),
                UserAlreadyExists => Conflict(),
                _ => throw new Exception("Unhandled case")
            };
        }

        [HttpGet("profile")]
        [ProducesResponseType(200, Type = typeof(Profile))]
        [ProducesResponseType(401)]
        [AuthorizeUser]
        public async Task<IActionResult> Get()
        {
            if (HttpContext.Items.ContainsKey("UserId"))
            {
                var userId = (long)HttpContext.Items["UserId"];
                var profile = await _userService.GetProfile(userId);
                return Ok(profile);
            }

            return Unauthorized();
        }
    }
}
