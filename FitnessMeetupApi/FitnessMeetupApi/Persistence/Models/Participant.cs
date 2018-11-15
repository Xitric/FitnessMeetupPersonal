using System;
using System.Collections.Generic;

namespace FitnessMeetupApi.Persistence.Models
{
    public partial class Participant
    {
        public long MeetupId { get; set; }
        public long UserId { get; set; }

        public Meetup Meetup { get; set; }
        public User User { get; set; }
    }
}
