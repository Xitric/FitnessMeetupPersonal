using FitnessMeetupApi.Service.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.IdentityModel.Tokens.Jwt;

namespace FitnessMeetupApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddPersistence();

            //Security
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateIssuerSigningKey = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidIssuer = Configuration["Auth0:Authority"],
                    ValidAudience = Configuration["Auth0:Audience"]
                };
                //Using this, the middleware can automatically fetch the public key online to validate the signing of the JWT
                options.Authority = Configuration["Auth0:Authority"];
                //Ensure that the JWT was issued to this API
                options.Audience = Configuration["Auth0:Audience"];
                options.RequireHttpsMetadata = true;
            });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("write:meetups", policy =>
                    policy.Requirements.Add(new ScopeRequirement("write:meetups", $"{Configuration["Auth0:Authority"]}/")));
                options.AddPolicy("write:profile", policy =>
                    policy.Requirements.Add(new ScopeRequirement("write:profile", $"{Configuration["Auth0:Authority"]}/")));
            });
            services.AddAuthorizationHandlers();

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}
