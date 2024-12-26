using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Tourist_Attraction;
using api.Helpers;
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

        public async Task<List<TouristAttraction>> GetAllAsync(QueryObject query)
        {
            var attractions = _context.TouristAttractions.Include(c => c.Reviews).ThenInclude(a => a.User).AsQueryable();
            if(!string.IsNullOrWhiteSpace(query.Category)){
                attractions = attractions.Where(s => s.Category.Contains(query.Category));
            }
            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            return await attractions.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<TouristAttraction?> GetAsyncById(int id)
        {
            return await _context.TouristAttractions.Include(c => c.Reviews).FirstOrDefaultAsync(c=> c.Id == id);
        }

        public async Task<TouristAttraction?> GetByNameAsync(string name)
        {
            return await _context.TouristAttractions.FirstOrDefaultAsync(x=> x.Name == name);
        }

        public Task<bool> TouristAttractionExists(int id)
        {
            return _context.TouristAttractions.AnyAsync(s=> s.Id == id);
        }

        public async Task<TouristAttraction?> UpdateAsync(int id, UpdateAttractionRequestDto attractionRequestDto)
        {
            var existingAttraction = await _context.TouristAttractions.FirstOrDefaultAsync(x=>x.Id == id);
            if(existingAttraction == null){
                return null;
            }
            existingAttraction.Name = attractionRequestDto.Name;
            existingAttraction.Description = attractionRequestDto.Description;
            existingAttraction.Longitude = attractionRequestDto.Longitude;
            existingAttraction.Latitude = attractionRequestDto.Latitude;

            existingAttraction.Category = attractionRequestDto.Category;

            await _context.SaveChangesAsync();
            return existingAttraction;
        }
    }
}