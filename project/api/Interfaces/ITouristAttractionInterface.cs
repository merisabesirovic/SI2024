using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Tourist_Attraction;
using api.Models;

namespace api.Interfaces
{
    public interface ITouristAttractionInterface
    {
        Task<List<TouristAttraction>> GetAllAsync();
        Task<TouristAttraction?> GetAsyncById(int id);
        Task<TouristAttraction> CreateAsync(TouristAttraction touristAttractionModel);
        Task<TouristAttraction?> UpdateAsync(int id, UpdateAttractionRequestDto attractionRequestDto);
        Task<TouristAttraction?> DeleteAsync(int id);

        
    }
}