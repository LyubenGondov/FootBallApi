using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FutballApi.Models
{
    public class Matches
    {
        public int MatchesId { get; set; }
        public string TeamOne { get; set; }
        public string TeamTwo { get; set; }
        public string Result { get; set; }
    }
}
