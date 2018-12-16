using FitnessMeetupApi.Service.Models;
using System.Collections.Generic;

namespace FitnessMeetupApi.Persistence
{
    public interface IMeetupsRepository
    {
        long CreateMeetup(Meetup meetup);

        Meetup GetMeetup(long id);

        IEnumerable<Meetup> GetMeetups(int offset, int count, string sport);

        void AddPartipant(long meetupId, string userId);
    }
}
