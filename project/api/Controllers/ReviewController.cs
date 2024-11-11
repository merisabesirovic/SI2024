using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepo;
        public ReviewController(IReviewRepository reviewRepo)
        {
            _reviewRepo = reviewRepo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll(){
            var reviews = await _reviewRepo.GetAllAsync();
            var reviewsDto = reviews.Select(s => s.ToCommentDto());
            return Ok(reviewsDto);
        }

        [HttpGet("{id:int}")]

        public async Task<IActionResult> GetById([FromRoute] int id){
            var review = await _reviewRepo.GetByIdAsync(id);
            if(review == null){
                return NotFound();
            }
            return Ok(review.ToCommentDto());
        }
    }
}