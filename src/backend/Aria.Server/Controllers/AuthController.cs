using Aria.Server.DTO.Actions;
using Aria.Server.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace Aria.Server.Controllers
{
    [ApiController]
    [Route("/auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;

        public AuthController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn(AuthenticateUser request)
        {
            var authenticatedUser = await _userService.GetUser(request);
            if (authenticatedUser != null)
            {
                return Ok(authenticatedUser);
            }
            return BadRequest(new { message = "Invalid username or password" });
        }
    }
}
