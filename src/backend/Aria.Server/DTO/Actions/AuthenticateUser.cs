namespace Aria.Server.DTO.Actions
{
    public class AuthenticateUser
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}