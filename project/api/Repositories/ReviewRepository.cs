using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class ReviewRepository : IReviewRepository
    {   private readonly ApplicationDBContext _context;
        public ReviewRepository(ApplicationDBContext context)
        {
            _context = context;
        }

    public async Task<Review> CreateAsync(Review reviewModel)
{
    _context.Entry(reviewModel).Reference(r => r.TouristAttraction).IsModified = false;

    await _context.Reviews.AddAsync(reviewModel);
    await _context.SaveChangesAsync();
    return reviewModel;
}

        public async Task<Review?> DeleteAsync(int id)
        {
            var reviewModel = await _context.Reviews.FirstOrDefaultAsync(x=> x.Id == id);
            if(reviewModel == null){
                return null;
            }
            _context.Reviews.Remove(reviewModel);
            await _context.SaveChangesAsync();
            return reviewModel;
        }

        public async Task<List<Review>> GetAllAsync()
        {
            return await _context.Reviews.ToListAsync();
        }

        public async Task<Review?> GetByIdAsync(int id)
        {
            return await _context.Reviews.FirstOrDefaultAsync(c => c.Id == id);
        }
        
    }
}