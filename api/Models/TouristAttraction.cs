using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class TouristAttraction
    {
        public int Id {get; set;}
        public string Name {get; set;} = string.Empty;
        public string Description {get; set;} = string.Empty;
        public string Location {get; set;} = string.Empty;
         public string Photos { get; set; } = string.Empty;
         public int CategoryId { get; set; } 
        public List<Review> Reviews { get; set; } = new List<Review>();

    }

    
}