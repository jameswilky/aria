namespace Aria.Server.DTO.Models
{
    public class AuthenticatedUser
    {
        public required string Username { get; set; }
        public required long Id { get; set; }
        public required string Token { get; set; }
    }
}