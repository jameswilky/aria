using Aria.Server.DTO.Actions;
using Aria.Server.DTO.Models;
using Aria.Server.Middleware;
using Aria.Server.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace Aria.Server.Controllers
{
    [ApiController]
    [Route("/user")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(AuthenticatedUser))] // Needed for nswag to work correctly
        public async Task<IActionResult> Create(RegisterUser request)
        {
            var authenticatedUser = await _userService.CreateUser(request);
            return Created($"/users/{authenticatedUser.Id}", authenticatedUser);
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
