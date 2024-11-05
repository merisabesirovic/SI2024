using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Tourist_Attraction;
using api.Interfaces;
using api.Mappers;
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
        public async Task <IActionResult> GetAll(){
            var tourist_attractions = await _attractionRepo.GetAllAsync();
            var tourist_attractionDto = tourist_attractions.Select(s=>s.ToAttractionDto());
            return Ok(tourist_attractions);
        }
        [HttpGet("{id}")]
        public async Task <IActionResult> GetById([FromRoute] int id){
            var tourist_attraction =  await _attractionRepo.GetAsyncById(id);
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
            await _attractionRepo.CreateAsync(attractionModel);
            return CreatedAtAction(nameof(GetById), new{id = attractionModel.Id}, attractionModel.ToAttractionDto());
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateAttractionRequestDto updateDto){
            var attractionModel = await _attractionRepo.UpdateAsync(id, updateDto);
            if(attractionModel == null){
                return NotFound();
            }
            
            return Ok(attractionModel.ToAttractionDto());

        }
        [HttpDelete]
        [Route("{id}")]
        public async Task <IActionResult> Delete([FromRoute] int id){
            var attractionModel = await _attractionRepo.DeleteAsync(id);
            if(attractionModel == null){
                return NotFound();
            }
            
            return NoContent();
        }

    }
}