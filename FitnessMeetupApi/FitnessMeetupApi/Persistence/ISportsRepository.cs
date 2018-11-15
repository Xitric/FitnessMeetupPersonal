using System.Collections.Generic;

namespace FitnessMeetupApi.Persistence
{
    public interface ISportsRepository
    {
        IEnumerable<string> GetSports();
    }
}
