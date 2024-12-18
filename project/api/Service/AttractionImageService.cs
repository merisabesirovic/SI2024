using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;

namespace api.Service
{
    public class AttractionImageService : IAttractionImageService
    {
        private readonly IAmazonS3 _s3;
        
        private const string BukcetName = "np.click";
        public AttractionImageService(IAmazonS3 s3)
        {
            _s3 = s3;
        }
        public async Task<PutObjectResponse> UploadImageAsync(int id, IFormFile file)
        {
            var putObjectReuqest = new PutObjectRequest{
                BucketName = BukcetName,
                Key = $"images/{id}",
                ContentType = file.ContentType,
                InputStream = file.OpenReadStream(),
                Metadata = {
                    ["x-amz-meta-originalname"] = file.FileName,
                    ["x-amz-meta-extenstion"] = Path.GetExtension(file.FileName)
                }
            };
            return await _s3.PutObjectAsync(putObjectReuqest);

        }
        
    }

    public interface IAttractionImageService
    {
        Task<PutObjectResponse> UploadImageAsync(int id, IFormFile file);
    }
}