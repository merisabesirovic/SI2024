using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using api.Data;
using api.Dtos.Tourist_Attraction;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/tourist_attractions")]
    [ApiController]
    public class TouristAttractionController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly ITouristAttractionInterface _attractionRepo;
        private readonly IAmazonS3 _s3Client;

        public TouristAttractionController(ApplicationDBContext context, ITouristAttractionInterface attractionRepo, IAmazonS3 s3Client)
        {
            _context = context;
            _attractionRepo = attractionRepo;
            _s3Client = s3Client;
        }

        [HttpGet]
    
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var touristAttractions = await _attractionRepo.GetAllAsync(query);
            var touristAttractionDto = touristAttractions.Select(s => s.ToAttractionDto()).ToList();

            foreach (var attractionDto in touristAttractionDto)
            {
                // Retrieve associated images from S3 and attach to DTO
                var imageUrls = await GetImageUrlsFromS3Async(attractionDto.Id);
                attractionDto.Photos = string.Join(",", imageUrls); // Combine URLs into a single string
            }

            return Ok(touristAttractionDto);
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
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var touristAttraction = await _attractionRepo.GetAsyncById(id);
            if (touristAttraction == null)
                return NotFound();

            var touristAttractionDto = touristAttraction.ToAttractionDto();

            // Retrieve associated images from S3 and attach to DTO
            var imageUrls = await GetImageUrlsFromS3Async(id);
            touristAttractionDto.Photos = string.Join(",", imageUrls);

            return Ok(touristAttractionDto);
        }

     [HttpPost("create")]
public async Task<ActionResult> Create(
    [FromForm] CreateAttractionRequestDto attractionDto,
    [FromForm] List<IFormFile> files,
    [FromForm] string bucketName)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    // Create tourist attraction in the database
    var attractionModel = attractionDto.ToAttractionFromDto();
    await _attractionRepo.CreateAsync(attractionModel);

    // Upload files to S3 and save URLs in the database
    if (files != null && files.Any())
    {
        var imageUrls = await UploadFilesToS3Async(attractionModel.Id, files, bucketName);

        // Save the image URLs in the database
        attractionModel.Photos = string.Join(",", imageUrls); // Store as a comma-separated string
        _context.TouristAttractions.Update(attractionModel);
        await _context.SaveChangesAsync();
    }

    return CreatedAtAction(nameof(GetById), new { id = attractionModel.Id }, attractionModel.ToAttractionDto());
}

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Find the attraction and include its reviews
            var attraction = await _context.TouristAttractions
                .Include(ta => ta.Reviews)
                .FirstOrDefaultAsync(ta => ta.Id == id);

            if (attraction == null)
                return NotFound();

            // Remove associated reviews
            _context.Reviews.RemoveRange(attraction.Reviews);

            // Delete images from S3
            await DeleteImagesFromS3Async(id);

            // Remove the attraction
            _context.TouristAttractions.Remove(attraction);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Helper Methods
        private async Task<List<string>> UploadFilesToS3Async(int id, IEnumerable<IFormFile> files, string bucketName)
{
    var folderName = $"{id}/";
    var fileUrls = new List<string>();

    foreach (var file in files)
    {
        var key = folderName + file.FileName;

        var request = new PutObjectRequest
        {
            BucketName = bucketName,
            Key = key,
            InputStream = file.OpenReadStream(),
            ContentType = file.ContentType
        };

        await _s3Client.PutObjectAsync(request);

        string publicUrl = $"https://{bucketName}.s3.amazonaws.com/{key}";
        fileUrls.Add(publicUrl);
    }

    return fileUrls;
}


        private async Task<List<string>> GetImageUrlsFromS3Async(int id)
        {
            var folderPrefix = $"{id}/";

            var request = new ListObjectsV2Request()
            {
                BucketName = "np.click",
                Prefix = folderPrefix
            };

            var result = await _s3Client.ListObjectsV2Async(request);
            return result.S3Objects.Select(s => $"https://np.click.s3.amazonaws.com/{s.Key}").ToList();
        }

        private async Task DeleteImagesFromS3Async(int id)
        {
            var folderPrefix = $"{id}/";

            var request = new ListObjectsV2Request()
            {
                BucketName = "np.click",
                Prefix = folderPrefix
            };

            var result = await _s3Client.ListObjectsV2Async(request);

            var deleteObjectsRequest = new DeleteObjectsRequest()
            {
                BucketName = "np.click",
                Objects = result.S3Objects.Select(s => new KeyVersion { Key = s.Key }).ToList()
            };

            await _s3Client.DeleteObjectsAsync(deleteObjectsRequest);
        }
    }
}
