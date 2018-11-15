using FitnessMeetupApi.Persistence;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class PersistenceServiceCollectionExtensions
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services)
        {
            services.AddSingleton<IMeetupsRepository, MeetupsRepository>();
            services.AddSingleton<ISportsRepository, SportsRepository>();
            services.AddSingleton<IUsersRepository, UserRepository>();
            
            return services;
        }
    }
}
