using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Aria.Server.Middleware
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeUserAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            // Extract the user claims
            var userIdClaim = context.HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == "id");

            if (userIdClaim == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            if (!long.TryParse(userIdClaim.Value, out long userId))
            {
                context.Result = new BadRequestObjectResult("Invalid user ID claim");
                return;
            }

            // Store the user ID in HttpContext items for use in controllers
            context.HttpContext.Items["UserId"] = userId;

            base.OnActionExecuting(context);
        }
    }

}