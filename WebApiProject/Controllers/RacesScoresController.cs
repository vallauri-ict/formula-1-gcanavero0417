using FormulaOneDll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApiProject.Controllers
{
    public class RacesScoresController : ApiController
    {
        DbTools db = new DbTools();

        public IEnumerable<Races_Score> GetAllCountries()
        {
            db.GetRaces_Scores();
            return db.Races_Scores.Values;
        }
        public IHttpActionResult GetRaces_Score(int id)
        {
            db.GetRaces_Scores();
            if (db.Races_Scores[id] == null)
                return NotFound();

            return Ok(db.Races_Scores[id]);
        }
    }
}
