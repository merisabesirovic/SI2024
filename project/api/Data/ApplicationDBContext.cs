using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<User>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            
        }
        public DbSet<TouristAttraction> TouristAttractions {get; set;}
        public DbSet<Review> Reviews {get;set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole{
                    Name = "Admin",
                    NormalizedName = "ADMIN",

                },
                new IdentityRole{
                    Name = "User",
                    NormalizedName = "USER",
                    
                },
                new IdentityRole{
                    Name = "Local_company",
                    NormalizedName = "LOCAL_COMPANY",
                    
                }
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }

    }
}