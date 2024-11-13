using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Tourist_Attraction;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class TouristAttractionRepository : ITouristAttractionInterface
    {   private readonly ApplicationDBContext _context;
        public TouristAttractionRepository(ApplicationDBContext context){
            _context = context;
        }

        public async Task<TouristAttraction> CreateAsync(TouristAttraction touristAttractionModel)
        {
            await _context.TouristAttractions.AddAsync(touristAttractionModel);
            await _context.SaveChangesAsync();
            return touristAttractionModel;
        }

        public async Task<TouristAttraction?> DeleteAsync(int id)
        {
            var attractionModel = await _context.TouristAttractions.FirstOrDefaultAsync(x=> x.Id == id);
            if(attractionModel == null){
                return null;
            }
            _context.TouristAttractions.Remove(attractionModel);
            await _context.SaveChangesAsync();
            return attractionModel;
        }

        public async Task<List<TouristAttraction>> GetAllAsync()
        {
            return await _context.TouristAttractions.Include(c => c.Reviews).ToListAsync();
        }

        public async Task<TouristAttraction?> GetAsyncById(int id)
        {
            return await _context.TouristAttractions.Include(c => c.Reviews).FirstOrDefaultAsync(c=> c.Id == id);
        }

        public async Task<TouristAttraction?> UpdateAsync(int id, UpdateAttractionRequestDto attractionRequestDto)
        {
            var existingAttraction = await _context.TouristAttractions.FirstOrDefaultAsync(x=>x.Id == id);
            if(existingAttraction == null){
                return null;
            }
            existingAttraction.Name = attractionRequestDto.Name;
            existingAttraction.Description = attractionRequestDto.Description;
            existingAttraction.Location = attractionRequestDto.Location;
            existingAttraction.Photos = attractionRequestDto.Photos;
            existingAttraction.CategoryId = attractionRequestDto.CategoryId;

            await _context.SaveChangesAsync();
            return existingAttraction;
        }
    }
}