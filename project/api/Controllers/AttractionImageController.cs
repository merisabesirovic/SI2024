 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon;
using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using api.Dtos;
using api.Service;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{   [Route("api/tourist_attractions")]
    [ApiController]
    public class AttractionImageController : ControllerBase{
    private readonly IAmazonS3 _s3Client;
    public AttractionImageController(IAmazonS3 s3Client)
    {
       _s3Client = s3Client;
    }

[HttpPost("{id:int}/images")]
public async Task<IActionResult> UploadFilesAsync(int id, IEnumerable<IFormFile> files, string bucketName, string? prefix)
{
    var bucketExists = await _s3Client.DoesS3BucketExistAsync(bucketName);
    if (!bucketExists)
        return NotFound($"Bucket {bucketName} does not exist.");

    var folderName = $"{id}/"; 

    
    var fileUrls = new List<string>();

    foreach (var file in files)
    {
        var key = string.IsNullOrEmpty(prefix) ? folderName + file.FileName : folderName + $"{prefix?.TrimEnd('/')}/{file.FileName}";

        var request = new PutObjectRequest()
        {
            BucketName = bucketName,
            Key = key,
            InputStream = file.OpenReadStream()
        };

        request.Metadata.Add("Content-Type", file.ContentType);

        await _s3Client.PutObjectAsync(request);

       
        string publicUrl = $"https://{bucketName}.s3.amazonaws.com/{key}";
        fileUrls.Add(publicUrl);
    }

    return Ok(new { Message = "Files uploaded successfully", Files = fileUrls });
}

[HttpGet("get-all")]
public async Task<IActionResult> GetAllFilesAsync(string bucketName, string folderPrefix)
{
    var bucketExists = await _s3Client.DoesS3BucketExistAsync(bucketName);
    if (!bucketExists) return NotFound($"Bucket {bucketName} does not exist.");

    
    if (!folderPrefix.EndsWith("/"))
    {
        folderPrefix += "/";
    }

    // List objects with the specified folder prefix (this is your folder in the bucket)
    var request = new ListObjectsV2Request()
    {
        BucketName = bucketName,
        Prefix = folderPrefix // Folder prefix to list files inside a folder
    };

    var result = await _s3Client.ListObjectsV2Async(request);

    // Map S3 objects to DTOs, constructing public URLs
    var s3Objects = result.S3Objects.Select(s =>
    {
        // Construct the public URL for the image object
        string publicUrl = $"https://{bucketName}.s3.amazonaws.com/{s.Key}";

        return new S3ObjectDto()
        {
            Name = s.Key,
            PresignedUrl = publicUrl, // Public URL for the object
        };
    });

    return Ok(s3Objects);
}

[HttpGet("get-by-key")]
public async Task<IActionResult> GetFileByKeyAsync(string bucketName, string key)
{
    
    Console.WriteLine($"Bucket: {bucketName}, Key: {key}");

    var bucketExists = await _s3Client.DoesS3BucketExistAsync(bucketName);
    if (!bucketExists) return NotFound($"Bucket {bucketName} does not exist.");

    try
    {
        // Just use the key, no need to include the full URL
        var s3Object = await _s3Client.GetObjectAsync(bucketName, key);
        return File(s3Object.ResponseStream, s3Object.Headers.ContentType);
    }
    catch (AmazonS3Exception s3Ex)
    {
        return StatusCode(500, $"Error retrieving file from S3: {s3Ex.Message}");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
    }
}

}}  