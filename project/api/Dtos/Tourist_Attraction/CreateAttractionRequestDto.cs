using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Tourist_Attraction
{
    public class CreateAttractionRequestDto
    {   [Required]
        [MaxLength(25, ErrorMessage = "Name must be less than 25 characters")]
        public string Name {get; set;} = string.Empty;
        [Required]
        [MaxLength(2000, ErrorMessage = "Description must be less than 2000 characters")]
        public string Description {get; set;} = string.Empty;
        [Required]
        [MaxLength(50, ErrorMessage = "Location must be less than 50 characters")]
        public string Location {get; set;} = string.Empty;
        [Required]
        public string Photos { get; set; } = string.Empty;
        [Required]
        public string Category { get; set; } = string.Empty;
    }
}