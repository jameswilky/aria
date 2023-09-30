using System.ComponentModel.DataAnnotations;

namespace Aria.Server.DTO.Models
{
    public class AuthenticatedUser
    {
        [Required]
        public required string Username { get; set; }
        [Required]
        public required long Id { get; set; }
        [Required]
        public required string Token { get; set; }
    }
}