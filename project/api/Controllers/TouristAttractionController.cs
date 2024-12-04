using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Tourist_Attraction;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/tourist_attractions")]
    [ApiController]
    public class TouristAttractionController : ControllerBase
    {   private readonly ApplicationDBContext _context;
        private readonly ITouristAttractionInterface _attractionRepo;
        public TouristAttractionController(ApplicationDBContext context, ITouristAttractionInterface attractionRepo)
        {
            _context = context;
            _attractionRepo = attractionRepo;
        }
        [HttpGet]
        [Authorize]

        public async Task <IActionResult> GetAll([FromQuery] QueryObject query){
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var tourist_attractions = await _attractionRepo.GetAllAsync(query);
            var tourist_attractionDto = tourist_attractions.Select(s=>s.ToAttractionDto()).ToList();
            return Ok(tourist_attractionDto);
        }
        [HttpGet("{id:int}")]
        public async Task <IActionResult> GetById([FromRoute] int id){
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var tourist_attraction =  await _attractionRepo.GetAsyncById(id);
            if(tourist_attraction == null){
                return NotFound();
            }
            else 
            {
                return Ok(tourist_attraction.ToAttractionDto());
            }
        }
        [HttpPost]
        public async Task<ActionResult> Create([FromBody]CreateAttractionRequestDto attractionDto){
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var attractionModel = attractionDto.ToAttractionFromDto();
            await _attractionRepo.CreateAsync(attractionModel);
            return CreatedAtAction(nameof(GetById), new{id = attractionModel.Id}, attractionModel.ToAttractionDto());
        }
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateAttractionRequestDto updateDto){
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var attractionModel = await _attractionRepo.UpdateAsync(id, updateDto);
            if(attractionModel == null){
                return NotFound();
            }
            
            return Ok(attractionModel.ToAttractionDto());

        }
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id){
         if(!ModelState.IsValid)
                return BadRequest(ModelState);
    // Find the attraction and include its reviews
         var attraction = await _context.TouristAttractions
        .Include(ta => ta.Reviews)
        .FirstOrDefaultAsync(ta => ta.Id == id);

        if (attraction == null)
        {
        return NotFound();
        }

    // Remove associated reviews
    _context.Reviews.RemoveRange(attraction.Reviews);

    // Remove the attraction
    _context.TouristAttractions.Remove(attraction);

    // Save changes
    await _context.SaveChangesAsync();

    return NoContent();
}


    }
}