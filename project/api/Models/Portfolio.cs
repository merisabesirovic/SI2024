using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Portfolios")]
    public class Portfolio
    {
        public string UserId { get; set; }
        public int  TouristAttractionId { get; set; }
        public User User { get; set; }
        public TouristAttraction TouristAttraction { get; set; }

    }
}