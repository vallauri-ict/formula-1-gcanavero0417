using FormulaOneDll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace WebApiProject.DTO
{
    [DataContract(Name = "racesScoreByRace")]
    public class RacesScoreByRace
    {
        [DataMember(Name = "id")]
        private readonly int id;
        [DataMember(Name = "driverLastName")]
        private string driverLastName;
        [DataMember(Name = "driverFirstName")]
        private string driverFirstName;
        [DataMember(Name = "pos")]
        public int pos;
        [DataMember(Name = "score")]
        private int score;
        [DataMember(Name = "details")]
        private string details;
        [DataMember(Name = "teamName")]
        private string teamName;

        public RacesScoreByRace(RacesScore rs)
        {
            this.id = rs.ID;
            this.driverLastName = rs.Driver.Lastname;
            this.driverFirstName = rs.Driver.Firstname;
            this.pos = rs.Pos.Pos;
            this.score = rs.Pos.Score;
            this.details = rs.Pos.Details;
            this.teamName = rs.Team.Name;
        }
    }
}