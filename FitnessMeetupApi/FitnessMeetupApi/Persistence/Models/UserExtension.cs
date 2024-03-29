﻿namespace FitnessMeetupApi.Persistence.Models
{
    public partial class User
    {
        public static Service.Models.User ToUserDto(User entity)
        {
            if (entity == null)
            {
                return null;
            }
            
            return new Service.Models.User()
            {
                Id = entity.UserId,
                Name = entity.Name,
                Email = entity.Email,
                ProfilePicture = entity.Picture
            };
        }

        public static User ToUserEntity(Service.Models.User dto)
        {
            if (dto == null || dto.Id == null)
            {
                return null;
            }

            return new User()
            {
                UserId = dto.Id,
                Name = dto.Name,
                Email = dto.Email,
                Picture = dto.ProfilePicture
            };
        }
    }
}
