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
        public DbSet<Portfolio> Portfolios {get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Portfolio>(x=>x.HasKey( p => new {p.UserId, p.TouristAttractionId}));

            builder.Entity<Portfolio>().HasOne(u=>u.User).WithMany(u=>u.Portfolios).HasForeignKey(p => p.UserId);
            builder.Entity<Portfolio>().HasOne(u=>u.TouristAttraction).WithMany(u=>u.Portfolios).HasForeignKey(p => p.TouristAttractionId);

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