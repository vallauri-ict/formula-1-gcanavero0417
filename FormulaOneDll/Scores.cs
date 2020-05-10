using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FormulaOneDll
{
    public class Scores
    {
        private int id;
        private int score;
        private string details;

        public Scores(int id, int score, string details)
        {
            this.id = id;
            this.score = score;
            this.details = details;
        }

        public int ID { get => id; set => id = value; }
        public int Score { get => score; set => score = value; }
        public string Details { get => details; set => details = value; }
    }
}
