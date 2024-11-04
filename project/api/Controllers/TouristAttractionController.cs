using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Tourist_Attraction;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/tourist_attractions")]
    [ApiController]
    public class TouristAttractionController : ControllerBase
    {   private readonly ApplicationDBContext _context;
        public TouristAttractionController(ApplicationDBContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task <IActionResult> GetAll(){
            var tourist_attractions = await _context.TouristAttractions.ToListAsync();
            var tourist_attractionDto = tourist_attractions.Select(s=>s.ToAttractionDto());
            return Ok(tourist_attractions);
        }
        [HttpGet("{id}")]
        public async Task <IActionResult> GetById([FromRoute] int id){
            var tourist_attraction =  await _context.TouristAttractions.FindAsync(id);
            if(tourist_attraction == null){
                return NotFound();
            }
            else 
            {
                return Ok(tourist_attraction);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Create([FromBody]CreateAttractionRequestDto attractionDto){
            var attractionModel = attractionDto.ToAttractionFromDto();
            await _context.AddAsync(attractionModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new{id = attractionModel.Id}, attractionModel.ToAttractionDto());
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateAttractionRequestDto updateDto){
            var attractionModel = await _context.TouristAttractions.FirstOrDefaultAsync(x => x.Id == id);
            if(attractionModel == null){
                return NotFound();
            }
            attractionModel.Name = updateDto.Name;
            attractionModel.Description = updateDto.Description;
            attractionModel.Location = updateDto.Location;
            attractionModel.Photos = updateDto.Photos;
            attractionModel.CategoryId = updateDto.CategoryId;

           await _context.SaveChangesAsync();
            return Ok(attractionModel.ToAttractionDto());

        }
        [HttpDelete]
        [Route("{id}")]
        public async Task <IActionResult> Delete([FromRoute] int id){
            var attractionModel = await _context.TouristAttractions.FirstOrDefaultAsync(x=> x.Id == id);
            if(attractionModel == null){
                return NotFound();
            }
            _context.TouristAttractions.Remove(attractionModel);
             await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}