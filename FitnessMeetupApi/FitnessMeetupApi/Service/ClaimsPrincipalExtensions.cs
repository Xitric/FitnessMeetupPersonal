using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace FitnessMeetupApi.Service.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string UserId(this ClaimsPrincipal principal)
        {
            if (principal == null)
            {
                throw new ArgumentNullException(nameof(principal));
            }

            return principal.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        }
    }
}
