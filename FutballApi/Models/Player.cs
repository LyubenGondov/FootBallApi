using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FutballApi.Models
{
    public class Player
    {
        public int PlayerId { get; set; }
        public string PlayerName { get; set; }
        public string PlayerTeam { get; set; }
        public int PlayerMatches { get; set; }
        public int PlayerGoals { get; set; }
    }
}
