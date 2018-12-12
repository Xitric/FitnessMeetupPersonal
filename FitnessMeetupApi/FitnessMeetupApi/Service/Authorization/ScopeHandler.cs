using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace FitnessMeetupApi.Service.Authorization
{
    public class ScopeHandler : AuthorizationHandler<ScopeRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ScopeRequirement requirement)
        {
            var scopeClaim = context.User.FindFirst(claim => claim.Type == "scope" && claim.Issuer == requirement.Issuer);
            if (scopeClaim == null)
            {
                return Task.CompletedTask;
            }

            var scopes = scopeClaim.Value.Split(' ');

            if (scopes.Any(scope => scope == requirement.Scope))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
