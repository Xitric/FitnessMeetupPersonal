using System.Linq;
using FitnessMeetupApi.Persistence.Models;

namespace FitnessMeetupApi.Persistence
{
    public class UserRepository: IUsersRepository
    {
        public string AddUser(FitnessMeetupApi.Service.Models.User user)
        {
            var userEntity = User.ToUserEntity(user);

            using (var context = new FitnessMeetupKasperContext())
            {   
                if (context.User.Find(userEntity.UserId) == null) {
                    context.User.Add(userEntity);
                    context.SaveChanges();
                }
            }
            return userEntity.UserId;
        }

        public FitnessMeetupApi.Service.Models.User GetUser(string userId)
        {
            using (var context = new FitnessMeetupKasperContext())
            {
                return User.ToUserDto(context.User.Find(userId));
                
            }
        }
    }
}
