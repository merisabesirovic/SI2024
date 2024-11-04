using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Review
{
    public int Id { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedOn {get; set;} = DateTime.Now;
    public int UserId { get; set; }
    public User User { get; set; } = new User();
}

}