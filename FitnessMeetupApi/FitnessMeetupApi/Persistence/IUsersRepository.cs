using FitnessMeetupApi.Service.Models;

namespace FitnessMeetupApi.Persistence
{
    public interface IUsersRepository
    {
        User GetUser(string userId);

        string AddUser(User user);
    }
}
