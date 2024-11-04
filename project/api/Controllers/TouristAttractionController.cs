using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Tourist_Attraction;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult GetAll(){
            var tourist_attractions = _context.TouristAttractions.ToList().Select(s=>s.ToAttractionDto());
            return Ok(tourist_attractions);
        }
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id){
            var tourist_attraction = _context.TouristAttractions.Find(id);
            if(tourist_attraction == null){
                return NotFound();
            }
            else 
            {
                return Ok(tourist_attraction);
            }
        }
        [HttpPost]
        public IActionResult Create([FromBody]CreateAttractionRequestDto attractionDto){
            var attractionModel = attractionDto.ToAttractionFromDto();
            _context.Add(attractionModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new{id = attractionModel.Id}, attractionModel.ToAttractionDto());
        }

    }
}