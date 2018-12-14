using System;
using System.Collections.Generic;
using System.Linq;

namespace FitnessMeetupApi.Persistence.Models
{
    public partial class Meetup
    {
        public static Service.Models.Meetup ToMeetupDto(Meetup entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new Service.Models.Meetup()
            {
                Id = entity.MeetupId,
                Title = entity.Title,
                Description = entity.Description,
                Sport = entity.Sport == "other" ? null : entity.Sport,
                Date = entity.Date,
                Location = ToLocationDto(entity.Location),
                Owner = User.ToUserDto(entity.OwnerNavigation),
                Participants = entity.Participant.Select(participant => User.ToUserDto(participant.User)).ToList()
            };
        }

        public static Meetup ToMeetupEntity(Service.Models.Meetup dto)
        {
            if (dto == null)
            {
                return null;
            }

            return new Meetup()
            {
                MeetupId = dto.Id == null ? 0 : (int)dto.Id,
                Title = dto.Title,
                Description = dto.Description,
                Sport = dto.Sport == null ? "other" : dto.Sport,
                Date = (DateTime)dto.Date,
                Location = ToLocationEntity(dto.Location),
                Owner = User.ToUserEntity(dto.Owner).UserId,
                Participant = dto.Participants == null ? new List<Participant>() : dto.Participants.Where(participant => participant.Id != null).Select(participant => new Models.Participant()
                {
                    MeetupId = (int)dto.Id,
                    UserId = participant.Id
                }).ToList()
            };
        }

        public static Service.Models.Location ToLocationDto(string entity)
        {
            if (entity == null)
            {
                return null;
            }

            var parts = entity.Split(':');
            if (parts.Length == 2)
            {
                if (double.TryParse(parts[0], out double lat) && double.TryParse(parts[1], out double lng))
                {
                    return new Service.Models.Location()
                    {
                        Lat = lat,
                        Lng = lng
                    };
                }
            }

            return null;
        }

        public static string ToLocationEntity(Service.Models.Location dto)
        {
            if (dto == null)
            {
                return null;
            }

            return $"{dto.Lat}:{dto.Lng}";
        }
    }
}
