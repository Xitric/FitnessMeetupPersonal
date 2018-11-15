using FitnessMeetupApi.Service.Models;

namespace FitnessMeetupApi.Persistence
{
    public interface IUsersRepository
    {
        User GetUser(long userId);

        long AddUser(User user);
    }
}
