using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace FitnessMeetupApi.Service.Authorization.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static bool HasId(this ClaimsPrincipal principal, string id)
        {
            if (principal == null)
            {
                throw new ArgumentNullException(nameof(principal));
            }

            if (id == null)
            {
                throw new ArgumentNullException(nameof(id));
            }

            return principal.FindFirst(JwtRegisteredClaimNames.Sub)?.Value == id;
        }
    }
}
