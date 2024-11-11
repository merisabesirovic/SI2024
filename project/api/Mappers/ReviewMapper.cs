using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Reviews;
using api.Models;

namespace api.Mappers
{
    public static class ReviewMapper
    {
        public static ReviewsDto ToCommentDto(this Review reviewModel){
            return new ReviewsDto{
                Id = reviewModel.Id,
                Rating = reviewModel.Rating,
                Comment = reviewModel.Comment,
                CreatedOn = reviewModel.CreatedOn,
                TouristAttractionId = reviewModel.TouristAttractionId
            };
        }
    }
}
