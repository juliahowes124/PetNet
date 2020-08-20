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
using System.Linq;
using System.Security.Claims;

namespace AnimalShelter.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photo")]
    [ApiController]
    public class UserPhotoController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        private readonly IUserRepository _repo;
        public UserPhotoController(IMapper mapper,
        IOptions<CloudinarySettings> cloudinaryConfig, IUserRepository repo) 
        {
            _repo = repo;
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
          
            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);

        }

        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetUserPhoto")]
        public async Task<IActionResult> GetUserPhoto(int id)
        {
            var photoFromRepo = await _repo.GetUserPhoto(id);
            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }
        
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> ChangeUserPhoto(int userId,
        [FromForm] PhotoForCreationDto photoForCreationDto)
        {
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();
            var userFromRepo = await _repo.GetUser(userId);

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

            var photo = _mapper.Map<UserPhoto>(photoForCreationDto);
            photo.UserId = userId;

            if (userFromRepo.ProfilePicture != null) {
                userFromRepo.ProfilePicture.Remove(userFromRepo.ProfilePicture.FirstOrDefault());
            }

            userFromRepo.ProfilePicture.Add(photo);

            if (await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetUserPhoto", new { userId = userId, id = photo.Id },
                photoToReturn);
            }

            return BadRequest("Could not add photo.");
        }

    }
}