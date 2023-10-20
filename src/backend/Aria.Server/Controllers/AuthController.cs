using Aria.Server.DTO.Actions;
using Aria.Server.DTO.Models;
using Aria.Server.Services;
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

        [HttpPost]
        [ProducesResponseType(200, Type = typeof(AuthenticatedUser))]
        [ProducesResponseType(401)]
        public async Task<IActionResult> SignIn(AuthenticateUser request)
        {
            var authenticatedUser = await _userService.GetUser(request);
            if (authenticatedUser != null)
            {
                return Ok(authenticatedUser);
            }

            return Unauthorized();
        }
    }
}
