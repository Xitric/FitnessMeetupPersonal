using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessMeetupApi.Service.Authorization
{
    public class ScopeRequirement : IAuthorizationRequirement
    {
        public string Scope { get; private set; }
        public string Issuer { get; private set; }

        public ScopeRequirement(string scope, string issuer)
        {
            Scope = scope;
            Issuer = issuer;
        }
    }
}
