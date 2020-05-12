using FormulaOneDll;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace WebApiProject.DTO
{
    [DataContract(Name = "team")]
    public class TeamSimple
    {
        [DataMember(Name = "id")]
        private readonly int id;
        [DataMember(Name = "name")]
        private string name;
        [DataMember(Name = "country")]
        private string country;
        [DataMember(Name = "logo")]
        private string logo;
        [DataMember(Name = "firstdriverid")]
        private int firstdriverid;
        [DataMember(Name = "firstdrivername")]
        private string firstdrivername;
        [DataMember(Name = "seconddriverid")]
        private int seconddriverid;
        [DataMember(Name = "seconddrivername")]
        private string seconddrivername;
        [DataMember(Name = "img")]
        private string img;

        public TeamSimple(Team t)
        {
            this.id = t.ID;
            this.name = t.Name;
            this.country = t.Country.CountryName;
            this.logo = t.Logo;
            this.firstdriverid = t.FirstDriver.ID;
            this.firstdrivername = t.FirstDriver.Lastname;
            this.seconddriverid = t.SecondDriver.ID;
            this.seconddrivername = t.SecondDriver.Lastname;
            this.img = t.Img;
        }
    }
}