using FormulaOneDll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace WebApiProject.DTO
{
    [DataContract(Name = "race")]
    public class RaceSimple
    {
        [DataMember(Name = "id")]
        private readonly int id;
        [DataMember(Name = "name")]
        private string name;
        [DataMember(Name = "circuitname")]
        private string circuitname;
        [DataMember(Name = "countrycode")]
        private string countrycode;
        [DataMember(Name = "date")]
        private DateTime date;


        public RaceSimple(Race r)
        {
            this.id = r.ID;
            this.name = r.Name;
            this.circuitname = r.Circuit.Name;
            this.countrycode = r.Circuit.Country.CountryCode;
            this.date = r.Date;
        }
    }
}