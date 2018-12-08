using System;
using System.Collections.Generic;

namespace FitnessMeetupApi.Persistence.Models
{
    public partial class User
    {
        public User()
        {
            Meetup = new HashSet<Meetup>();
            Participant = new HashSet<Participant>();
        }

        public string Name { get; set; }
        public string Email { get; set; }
        public string Picture { get; set; }
        public string UserId { get; set; }

        public ICollection<Meetup> Meetup { get; set; }
        public ICollection<Participant> Participant { get; set; }
    }
}
