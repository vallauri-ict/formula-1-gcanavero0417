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
    [RoutePrefix("api/racesscores")]
    public class racesscoresController : ApiController
    {
        DbTools db = new DbTools();

        public IEnumerable<RacesScore> GetAllRacesScores()
        {
            db.GetRacesScores();
            return db.RacesScores.Values;
        }

        [Route("race/{raceId:int}")]
        public IEnumerable<RacesScoreByRace> GetRacesScoreByRace(int raceId)
        {
            List<RacesScoreByRace> rs = new List<RacesScoreByRace>();
            db.GetRacesScoreByRace(raceId).Values.ToList().ForEach(racescore => rs.Add(new RacesScoreByRace(racescore)));
            return rs.OrderByDescending(o => o.pos).ToList();
        }

        [Route("{id:int}")]
        public IHttpActionResult GetRacesScore(int id)
        {
            db.GetRacesScores();
            if (db.RacesScores[id] == null)
                return NotFound();

            return Ok(db.RacesScores[id]);
        }
    }
}
