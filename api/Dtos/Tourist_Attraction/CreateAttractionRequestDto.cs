using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Tourist_Attraction
{
    public class CreateAttractionRequestDto
    {
         public string Name {get; set;} = string.Empty;
        public string Description {get; set;} = string.Empty;
        public string Location {get; set;} = string.Empty;
         public string Photos { get; set; } = string.Empty;
         public int CategoryId { get; set; } 
    }
}