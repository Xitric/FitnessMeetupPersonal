using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessMeetupApi.Persistence.Models
{
    public partial class FitnessMeetupKasperContext
    {
        public FitnessMeetupKasperContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
    }
}
