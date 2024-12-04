using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Reviews
{
    public class ReviewsDto
    {
    public int Id { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedOn {get; set;} = DateTime.Now;
    public int? TouristAttractionId {get; set;} 
    public string CreatedBy {get;set;} = string.Empty;
    } 
}