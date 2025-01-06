using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using api.Data;
using api.Dtos.Reviews;
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
        var imageUrls = await GetImageUrlsFromS3Async(attractionDto.Id);
        attractionDto.Photos = imageUrls.Any() ? string.Join(",", imageUrls) : "No images available";
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

    
[HttpPost("create/{userId}")]
public async Task<ActionResult> Create(
    [FromRoute] string userId,  
    [FromForm] CreateAttractionRequestDto attractionDto,
    [FromForm] List<IFormFile> files,
    [FromForm] string bucketName)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    
    var attractionModel = attractionDto.ToAttractionFromDto();
    attractionModel.OwnerId = userId;

    // Create the tourist attraction and save it to the database
    await _attractionRepo.CreateAsync(attractionModel);

    // Upload files to S3 and save the URLs in the database
    if (files != null && files.Any())
    {
        var imageUrls = await UploadFilesToS3Async(attractionModel.Id, files, bucketName);

        // Save the image URLs as a comma-separated string
        attractionModel.Photos = string.Join(",", imageUrls);
        _context.TouristAttractions.Update(attractionModel);
        await _context.SaveChangesAsync();
    }

    return CreatedAtAction(nameof(GetById), new { id = attractionModel.Id }, attractionModel.ToAttractionDto());
}

// [HttpGet("checkCreated/{userId}")]
// public async Task<IActionResult> CheckIfUserCreatedAttraction(string userId)
// {
//     // Check if the user already has a tourist attraction
//     var existingAttraction = await _context.TouristAttractions
//                                             .FirstOrDefaultAsync(ta => ta.OwnerId == userId);

//     if (existingAttraction == null)
//     {
//         return NotFound("You have not created a tourist attraction yet.");
//     }

//     return Ok($"You have already created a tourist attraction {existingAttraction.Name}.");
// }
[HttpGet("myAttraction/{userId}")]
public async Task<IActionResult> GetMyAttraction(string userId)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    // Retrieve the tourist attraction created by the user, including reviews
    var userAttraction = await _context.TouristAttractions
                                        .Include(ta => ta.Reviews) 
                                        .ThenInclude(r => r.User) // Ensure reviews are included
                                        .FirstOrDefaultAsync(ta => ta.OwnerId == userId);

    if (userAttraction == null)
    {
        // Return a response indicating no attraction is created
        return Ok(new 
        { 
            hasCreatedAttraction = false, 
            attraction = (object)null 
        });
    }

    var userAttractionDto = userAttraction.ToAttractionDto();

    // Retrieve associated images from S3 and attach to the DTO
    var imageUrls = await GetImageUrlsFromS3Async(userAttraction.Id);
    userAttractionDto.Photos = string.Join(",", imageUrls);

    // Return the attraction details with reviews already included in the DTO
    return Ok(new 
    { 
        hasCreatedAttraction = true, 
        attraction = userAttractionDto 
    });
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

    var request = new ListObjectsV2Request
    {
        BucketName = "np.click",
        Prefix = folderPrefix
    };

    var result = await _s3Client.ListObjectsV2Async(request);

    if (result?.S3Objects == null || !result.S3Objects.Any())
        return new List<string>(); // Return an empty list if no objects are found

    return result.S3Objects
        .Where(s => s != null) // Ensure no null objects in the list
        .Select(s => $"https://np.click.s3.amazonaws.com/{s.Key}")
        .ToList();
}


private async Task DeleteImagesFromS3Async(int id)
{
    var folderPrefix = $"{id}/";

    try
    {
        // Create a request to list objects in the S3 bucket with the specified prefix.
        var request = new ListObjectsV2Request()
        {
            BucketName = "np.click",
            Prefix = folderPrefix
        };

        // Get the result of the object list request.
        var result = await _s3Client.ListObjectsV2Async(request);

        // Check if there are objects to delete.
        if (result.S3Objects != null && result.S3Objects.Any())
        {
            // Prepare a delete request for the objects found in the specified folder.
            var deleteObjectsRequest = new DeleteObjectsRequest()
            {
                BucketName = "np.click",
                Objects = result.S3Objects.Select(s => new KeyVersion { Key = s.Key }).ToList()
            };

            // Delete the objects from S3.
            await _s3Client.DeleteObjectsAsync(deleteObjectsRequest);
        }
    }
    catch (AmazonS3Exception)
    {
        // Handle specific S3 exceptions if necessary.
        throw;  // rethrow the exception to be handled elsewhere if needed
    }
    catch (Exception)
    {
        // Handle any other unforeseen exceptions.
        throw;  // rethrow the exception to be handled elsewhere if needed
    }
}}}