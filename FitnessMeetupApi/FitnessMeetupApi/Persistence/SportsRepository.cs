using FitnessMeetupApi.Persistence.Models;
using System.Collections.Generic;
using System.Linq;

namespace FitnessMeetupApi.Persistence
{
    public class SportsRepository : ISportsRepository
    {
        public IEnumerable<string> GetSports()
        {
            using (var context = new FitnessMeetupKasperContext())
            {
                return context.Sport.Select(s => s.Name).ToList();
            }
        }
    }
}
