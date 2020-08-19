

using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AnimalShelter.API.Data;
using AnimalShelter.API.DTOs;
using AnimalShelter.API.Helpers;
using AnimalShelter.API.Models;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace AnimalShelter.API.Controllers
{
    [Authorize]
    [Route("api/animals/{animalId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IAnimalRepository _animal_repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        private readonly IUserRepository _user_repo;
        public PhotosController(IAnimalRepository animal_repo, IMapper mapper,
        IOptions<CloudinarySettings> cloudinaryConfig, IUserRepository user_repo) 
        {
            _user_repo = user_repo;
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _animal_repo = animal_repo;
          
            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

        _cloudinary = new Cloudinary(acc);

    }

    [AllowAnonymous]
    [HttpGet("{id}", Name = "GetPhoto")]
    public async Task<IActionResult> GetPhoto(int id)
    {
        var photoFromRepo = await _animal_repo.GetPhoto(id);
        var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

        return Ok(photo);
    }

    [HttpPost]
    public async Task<IActionResult> AddPhotoForAnimal(int animalId, int userId,
        [FromForm] PhotoForCreationDto photoForCreationDto)
    {
        // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //     return Unauthorized();
        var animalFromRepo = await _animal_repo.GetAnimal(animalId);

        var file = photoForCreationDto.File;
        var uploadResult = new ImageUploadResult();
        if (file.Length > 0)
        {
            using (var stream = file.OpenReadStream())
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.Name, stream),
                    Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                };

                uploadResult = _cloudinary.Upload(uploadParams);
            }
        }
        photoForCreationDto.Url = uploadResult.Url.ToString();
        photoForCreationDto.PublicId = uploadResult.PublicId;

        var photo = _mapper.Map<Photo>(photoForCreationDto);

        if (!animalFromRepo.Photos.Any(u => u.IsMain))
            photo.IsMain = true;

        animalFromRepo.Photos.Add(photo);

        if (await _animal_repo.SaveAll())
        {
            var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
            return CreatedAtRoute("GetPhoto", new { animalId = animalId, id = photo.Id },
            photoToReturn);
        }

        return BadRequest("Could not add photo.");
    }


    [HttpPost("{id}/setMain")]
    public async Task<IActionResult> SetMainPhoto(int userId, int animalId, int id)
    {

        // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //     return Unauthorized();

        var animal = await _animal_repo.GetAnimal(animalId);

        if (!animal.Photos.Any(p => p.Id == id))
            return Unauthorized();

        var photoFromRepo = await _animal_repo.GetPhoto(id);

        if (photoFromRepo.IsMain)
            return BadRequest("This is already the main photo");

        var currentMainPhoto = await _animal_repo.GetMainPhoto(animalId);
        currentMainPhoto.IsMain = false;

        photoFromRepo.IsMain = true;

        if (await _animal_repo.SaveAll())
            return NoContent();

        return BadRequest("Could not set photo to main");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePhoto(int animalId, int userId, int id)
    {
        // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //     return Unauthorized();

        var animal = await _animal_repo.GetAnimal(animalId);

        if (!animal.Photos.Any(p => p.Id == id))
            return Unauthorized();
        
        var photoFromRepo = await _animal_repo.GetPhoto(id);

        if (photoFromRepo.IsMain)
            return  BadRequest("You cannot delete your main photo");
        
        if (photoFromRepo.PublicId != null)
        {
            var deleteParams = new DeletionParams(photoFromRepo.PublicId);

            var result = _cloudinary.Destroy(deleteParams);

            if (result.Result == "ok") 
            {
                _animal_repo.Delete(photoFromRepo);
            }
        }

        if (photoFromRepo.PublicId == null)
        {
            _animal_repo.Delete(photoFromRepo);
        }


        if (await _animal_repo.SaveAll())
            return Ok();
        
        return BadRequest("Failed to delete the photo");

        }

}
}