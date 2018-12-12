using FitnessMeetupApi.Service.Authorization;
using Microsoft.AspNetCore.Authorization;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class FitnessAuthorizationServiceCollectionExtensions
    {
        public static IServiceCollection AddAuthorizationHandlers(this IServiceCollection services)
        {
            services.AddSingleton<IAuthorizationHandler, ScopeHandler>();
            
            return services;
        }
    }
}
