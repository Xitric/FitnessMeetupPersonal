using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;
using FitnessMeetupApi.Persistence.Models;

namespace FitnessMeetupApi.Persistence
{
    public class MeetupsRepository : IMeetupsRepository
    {
        public void AddPartipant(long meetupId, string userId)
        {
            using (var context = new FitnessMeetupKasperContext())
            {
                if (context.Participant.Any(p => p.MeetupId == meetupId && p.UserId == userId)) {
                    return;
                }

                Participant participant = new Participant()
                {
                    MeetupId = meetupId,
                    UserId = userId,
                    Meetup = context.Meetup.Find(meetupId),
                    User = context.User.Find(userId)
                };

                context.Participant.Add(participant);
                context.SaveChanges();
            }
        }

        public bool CreateMeetup(Service.Models.Meetup meetup)
        {
            var meetupEntity = Meetup.ToMeetupEntity(meetup);

            using (var context = new FitnessMeetupKasperContext())
            {
                meetupEntity.MeetupId = 0;
                context.Meetup.Add(meetupEntity);
                context.SaveChanges();

            }

            return true;
        }

        public Service.Models.Meetup GetMeetup(long id)
        {
            using (var context = new FitnessMeetupKasperContext())
            {
                return Meetup.ToMeetupDto(
                    context.Meetup
                    .Include(m => m.OwnerNavigation)
                    .Include(m => m.Participant)
                        .ThenInclude(p => p.User)
                    .ToList()
                    .Where(m => m.MeetupId == id)
                    .FirstOrDefault());
            }
        }

        public IEnumerable<Service.Models.Meetup> GetMeetups(int offset, int count, string sport)
        {
            using (var context = new FitnessMeetupKasperContext())
            {
                IQueryable<Meetup> meetups = context.Meetup;

                if (sport != null)
                {
                    meetups = meetups.Where(m => m.Sport == sport);
                }

                return meetups
                    .Where(m => m.Date > DateTime.Now)
                    .OrderBy(m => m.Date).ThenBy(m => m.MeetupId)
                    .Skip(offset)
                    .Take(count)
                    .Include(m => m.OwnerNavigation)
                    .Include(m => m.Participant)
                        .ThenInclude(p => p.User)
                    .Select(m => Meetup.ToMeetupDto(m))
                    .ToList();
            }
        }
    }
}
