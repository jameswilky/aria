using System.ComponentModel.DataAnnotations;

namespace Aria.Server.DTO.Actions
{
    public class AddUser
    {
        [Required]
        [RegularExpression(@"^[a-zA-Z].{2,}$", ErrorMessage = "Username must start with a letter and be at least 3 characters long.")]
        public required string Username { get; set; }
        
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        
        [Required]
        [StringLength(100,MinimumLength = 8)]
        public required string Password { get; set; }
    }
}