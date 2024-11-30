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
    [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5")]
    
    public int Rating { get; set; }
    [Required]
    [MinLength(5, ErrorMessage = "Length must be min 5 characters")]
    [MaxLength(400, ErrorMessage = "Comment cannot be over 400 characters")]
    public string Comment { get; set; } = string.Empty;
    }
}