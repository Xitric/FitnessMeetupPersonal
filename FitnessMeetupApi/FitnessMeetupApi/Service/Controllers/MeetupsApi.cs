/*
 * Fitness Meetup
 *
 * The public API for the FitnessMeetup platform
 *
 * OpenAPI spec version: 1.0.0
 * 
 * Generated by: https://openapi-generator.tech
 */

using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using FitnessMeetupApi.Service.Attributes;
using FitnessMeetupApi.Service.Models;
using FitnessMeetupApi.Persistence;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using FitnessMeetupApi.Service.Authorization.Extensions;

namespace FitnessMeetupApi.Service.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    public class MeetupsApiController : ControllerBase
    {
        private readonly IMeetupsRepository meetups;

        public MeetupsApiController(IMeetupsRepository meetups)
        {
            this.meetups = meetups;
        }

        /// <summary>
        /// Add a new meetup to the database.
        /// </summary>
        /// <param name="meetup">Meetup object that needs to be added to the database.</param>
        /// <response code="201">Successfully created a new meetup.</response>
        [HttpPost]
        [Route("/v1/meetups")]
        [ValidateModelState]
        [Authorize(Policy = "write:meetups")]
        public virtual IActionResult AddMeetup([FromBody]Meetup meetup)
        {
            //Ensure that users can only post meetups in their own name
            if (User.HasId(meetup.Owner.Id))
            {
                var id = meetups.CreateMeetup(meetup);
                return new ObjectResult(meetups.GetMeetup(id));
            }
            else
            {
                return Unauthorized();
            }
        }

        /// <summary>
        /// Adds a participant to a specific meetup.
        /// </summary>
        /// <param name="id">The unique identifier for the specific meetup.</param>
        /// <param name="body">The id of the user to add as a participant.</param>
        /// <response code="201">Successfully added the participant to the specified meetup.</response>
        [HttpPost]
        [Route("/v1/meetups/{id}/participants")]
        [ValidateModelState]
        [Authorize(Policy = "write:meetups")]
        public virtual IActionResult AddParticipant([FromRoute][Required]long? id, [FromBody]string body)
        {
            //Ensure that users can only join meetups in their own name
            if (User.HasId(body))
            {
                meetups.AddPartipant((long)id, body);
                return new ObjectResult(meetups.GetMeetup((long) id));
            }
            else
            {
                return Unauthorized();
            }
        }

        /// <summary>
        /// Get information about the meetup with the specified id.
        /// </summary>
        /// <param name="id">The unique identifier of the meetup to retrieve.</param>
        /// <response code="200">Successfully retrieved the requested meetup.</response>
        /// <response code="404">The requested meetup does not exist.</response>
        [HttpGet]
        [Route("/v1/meetups/{id}")]
        [ValidateModelState]
        public virtual IActionResult GetMeetup([FromRoute][Required]long? id)
        {
            var meetup = meetups.GetMeetup((long)id);
            if (meetup == null)
            {
                return NotFound();
            }

            return new ObjectResult(meetup);
        }

        /// <summary>
        /// Get a list of upcoming meetups using paging.
        /// </summary>
        /// <remarks>By default, this returns the next 25 upcoming meetups, and does not skip any.</remarks>
        /// <param name="offset">How many meetups to skip from the first upcoming meetup.</param>
        /// <param name="count">How many meetups to retrieve.</param>
        /// <param name="sport">The type of sport to filter meetups by. This filter is not used if not specified.</param>
        /// <response code="200">Successfully retrieved upcoming meetups.</response>
        [HttpGet]
        [Route("/v1/meetups")]
        [ValidateModelState]
        public virtual IActionResult GetUpcomingMeetups([FromQuery]int? offset, [FromQuery]int? count, [FromQuery]string sport)
        {
            if (offset == null)
            {
                offset = 0;
            }

            if (count == null)
            {
                count = 25;
            }

            IEnumerable<Meetup> meetupCollection = meetups.GetMeetups((int)offset, (int)count, sport);
            IEnumerable<Meetup> laterMeetups = meetups.GetMeetups((int)(offset + count), 1, sport);
            var hasMoreMeetups = laterMeetups.FirstOrDefault() != null;
            Response.Headers.Add("Has-More-Meetups", hasMoreMeetups.ToString());

            return new ObjectResult(meetupCollection);
        }
    }
}
