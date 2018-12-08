using System.Linq;
using FitnessMeetupApi.Persistence.Models;

namespace FitnessMeetupApi.Persistence
{
    public class UserRepository : IUsersRepository
    {
        public string AddUser(Service.Models.User user)
        {
            var userEntity = User.ToUserEntity(user);

            using (var context = new FitnessMeetupKasperContext())
            {
                User existingUser = context.User.Find(userEntity.UserId);

                if (existingUser == null)
                {
                    context.User.Add(userEntity);
                }
                else
                {
                    existingUser.Name = user.Name;
                    existingUser.Email = user.Email;
                    existingUser.Picture = user.ProfilePicture;
                }

                context.SaveChanges();
            }
            return userEntity.UserId;
        }

        public Service.Models.User GetUser(string userId)
        {
            using (var context = new FitnessMeetupKasperContext())
            {
                return User.ToUserDto(context.User.Find(userId));
            }
        }
    }
}
