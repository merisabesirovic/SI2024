using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class User :IdentityUser
    {
      public List<Portfolio> Portfolios {get; set;} = new List<Portfolio>();
       public bool IsApproved { get; set; } = false;
        

   
    }
}