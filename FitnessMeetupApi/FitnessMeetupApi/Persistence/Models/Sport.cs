using System;
using System.Collections.Generic;

namespace FitnessMeetupApi.Persistence.Models
{
    public partial class Sport
    {
        public Sport()
        {
            Meetup = new HashSet<Meetup>();
        }

        public string Name { get; set; }

        public ICollection<Meetup> Meetup { get; set; }
    }
}
