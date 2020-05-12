using FormulaOneDll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApiProject.DTO;

namespace WebApiProject.Controllers
{
    [RoutePrefix("api/races")]
    public class racesController : ApiController
    {
        DbTools db = new DbTools();

        public IEnumerable<Race> GetAllRaces()
        {
            db.GetRaces();
            return db.Races.Values;
        }
        [Route("simple")]
        public IEnumerable<RaceSimple> GetAllSimpleRaces()
        {
            db.GetRaces();
            List<RaceSimple> r = new List<RaceSimple>();
            db.Races.Values.ToList().ForEach(race => r.Add(new RaceSimple(race)));
            return r;
        }
        [Route("{id:int}")]
        public IHttpActionResult GetRace(int id)
        {
            db.GetRaces();
            if (db.Races[id] == null)
                return NotFound();

            return Ok(db.Races[id]);
        }
    }
}
