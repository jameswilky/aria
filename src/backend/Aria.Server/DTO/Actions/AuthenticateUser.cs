using System.ComponentModel.DataAnnotations;

namespace Aria.Server.DTO.Actions
{
    public class AuthenticateUser
    {
        [Required]
        public required string Username { get; set; }
        [Required]
        public required string Password { get; set; }
    }
}