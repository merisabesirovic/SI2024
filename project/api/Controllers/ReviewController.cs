using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Reviews;
using api.Interfaces;
using api.Mappers;
using api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepo;
        private readonly ITouristAttractionInterface _attractionInterface;
        public ReviewController(IReviewRepository reviewRepo, ITouristAttractionInterface attractionInterface)
        {
            _reviewRepo = reviewRepo;
            _attractionInterface = attractionInterface;
        }
        [HttpGet]
        
        public async Task<IActionResult> GetAll(){
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var reviews = await _reviewRepo.GetAllAsync();
            var reviewsDto = reviews.Select(s => s.ToReviewDto());
            return Ok(reviewsDto);
        }

        [HttpGet("{id:int}")]

        public async Task<IActionResult> GetById([FromRoute] int id){
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var review = await _reviewRepo.GetByIdAsync(id);
            if(review == null){
                return NotFound();
            }
            return Ok(review.ToReviewDto());
        }
        [HttpPost("{attractionId:int}")]
        [Authorize]
        public async Task <IActionResult> Create([FromRoute]int attractionId, CreateReviewDto reviewDto){
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            if(!await _attractionInterface.TouristAttractionExists(attractionId)){
                return BadRequest("Attraction does not exist");
            }

            var reviewModel = reviewDto.ToReviewFromCreate(attractionId);
            await _reviewRepo.CreateAsync(reviewModel);
            return CreatedAtAction(nameof(GetById), new{ id = reviewModel.Id}, reviewModel.ToReviewDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task <IActionResult> Delete([FromRoute]int id)
        {   if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var reviewModel = await _reviewRepo.DeleteAsync(id);
            if(reviewModel == null){
                return NotFound("Review does not exist");
            }
            return Ok(reviewModel);
        }
        
        
    }
}