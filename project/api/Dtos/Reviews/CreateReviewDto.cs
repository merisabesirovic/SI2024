using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Reviews
{
    public class CreateReviewDto
    {
    [Required]
    [Range(1, 5, ErrorMessage = "Ocena mora biti između 1 i 5")]
    
    public int Rating { get; set; }
    [Required]
    [MinLength(5, ErrorMessage = "Dužina komentara mora biti minimalno 5 karaktera")]
    [MaxLength(150, ErrorMessage = "Dužina komentara mora biti manje od 100 karaktera")]
    public string Comment { get; set; } = string.Empty;
    }
}