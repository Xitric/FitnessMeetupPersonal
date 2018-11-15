using System;
using System.Collections.Generic;

namespace FitnessMeetupApi.Persistence.Models
{
    public partial class Meetup
    {
        public Meetup()
        {
            Participant = new HashSet<Participant>();
        }

        public long MeetupId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime Date { get; set; }
        public long Owner { get; set; }
        public string Sport { get; set; }

        public User OwnerNavigation { get; set; }
        public Sport SportNavigation { get; set; }
        public ICollection<Participant> Participant { get; set; }
    }
}
