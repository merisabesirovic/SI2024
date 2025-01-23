using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Tourist_Attraction
{
    public class CreateAttractionRequestDto
    {   [Required]
        [MaxLength(200, ErrorMessage = "Ime mora da bude kraće od 25 karaktera")]
        public string Name {get; set;} = string.Empty;
        [Required]
        [MaxLength(2000, ErrorMessage = "Opis mora biti kraći od 2000 karaktera")]
        public string Description {get; set;} = string.Empty;
        [Required]
        [MaxLength(50, ErrorMessage = "Lokacija mora imati manje od 50 karaktera")]
        public string Longitude {get; set;} = string.Empty;

        [Required]
        [MaxLength(50, ErrorMessage = "Lokacija mora imati manje od 50 karaktera")]

        public string Latitude {get;set;} = string.Empty;
        [Required]
        public string Category { get; set; } = string.Empty;
    }
}