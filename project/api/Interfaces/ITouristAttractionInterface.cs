using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Tourist_Attraction;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface ITouristAttractionInterface
    {
        Task<List<TouristAttraction>> GetAllAsync(QueryObject query);
        Task<TouristAttraction?> GetAsyncById(int id);
        Task<TouristAttraction> CreateAsync(TouristAttraction touristAttractionModel);
        Task<TouristAttraction?> UpdateAsync(int id, UpdateAttractionRequestDto attractionRequestDto);
        Task<TouristAttraction?> DeleteAsync(int id);
        Task<bool>TouristAttractionExists(int id);
        Task<TouristAttraction?> GetByNameAsync(string name);

        
    }
}