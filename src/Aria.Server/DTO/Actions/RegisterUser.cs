namespace Aria.Server.DTO.Actions
{
    public class RegisterUser
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}