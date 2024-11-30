using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Tourist_Attraction;
using api.Models;

namespace api.Mappers
{
    public static class TouristAttractionMapper
    {
        public static TouristAttractionDto ToAttractionDto(this TouristAttraction touristAttractionModel){
                return new TouristAttractionDto{
                    Id = touristAttractionModel.Id,
                    Name = touristAttractionModel.Name,
                    Description = touristAttractionModel.Description,
                    Location = touristAttractionModel.Location,
                    Photos = touristAttractionModel.Photos,
                    Category = touristAttractionModel.Category,
                    Reviews = touristAttractionModel.Reviews.Select(r => r.ToReviewDto()).ToList(),
                };
        }
        public static TouristAttraction ToAttractionFromDto(this CreateAttractionRequestDto touristAttractionDto){
            return new TouristAttraction{
                Name = touristAttractionDto.Name,
                Description = touristAttractionDto.Description,
                Location = touristAttractionDto.Location,
                Photos = touristAttractionDto.Photos,
                Category = touristAttractionDto.Category
            };
        }
    }
    
}