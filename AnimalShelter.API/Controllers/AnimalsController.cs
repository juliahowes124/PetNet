using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AnimalShelter.API.Data;
using AnimalShelter.API.DTOs;
using AnimalShelter.API.Helpers;
using AnimalShelter.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalShelter.API.Controllers
{
    // [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalsController : ControllerBase
    {
        private readonly IAnimalRepository _animal_repo;
        private readonly IMapper _mapper;
        private readonly IUserRepository _user_repo;

        public AnimalsController(IAnimalRepository animal_repo, IMapper mapper, IUserRepository user_repo)
        {
            _user_repo = user_repo;
            _animal_repo = animal_repo;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAnimals([FromQuery]AnimalParams animalParams)
        {

            var animals = await _animal_repo.GetAnimals(animalParams);

            var animalsToReturn = _mapper.Map<IEnumerable<AnimalForListDto>>(animals);

            Response.AddPagination(animals.CurrentPage, animals.PageSize, 
                animals.TotalCount, animals.TotalPages);

            return Ok(animalsToReturn);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAnimal(int id)
        {
            var animal = await _animal_repo.GetAnimal(id);
            var user = await _user_repo.GetUser(animal.UserId);
            var firstMap= _mapper.Map<AnimalForDetailDto>(user);
            var animalToReturn = _mapper.Map(animal, firstMap);
            return Ok(animalToReturn);
        }

        [HttpPost("{userId}/register")]
        public async Task<IActionResult> Register(int userId, AnimalForRegisterDto animalForRegisterDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var animalToCreate = _mapper.Map<Animal>(animalForRegisterDto);
            
            var createdAnimal = await _animal_repo.Register(animalToCreate);
            return StatusCode(201);
        }

        [HttpPost("tags/{animalId}")]
        public async Task<IActionResult> AddTag(int animalId, TagForCreationDto tagForCreationDto, int userId)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var tag = _mapper.Map<Tag>(tagForCreationDto);
            var animalFromRepo = await _animal_repo.GetAnimal(animalId);
            animalFromRepo.Tags.Add(tag);
            if (await _animal_repo.SaveAll())
            {
                return Ok(tag);
            }

            return BadRequest("Could not add tag.");
        }

        [HttpPut("{id}", Name="GetAnimal")]
        public async Task<IActionResult> UpdateAnimal(int id, AnimalForUpdateDto animalForUpdateDto) 
        {
            if (animalForUpdateDto.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var animalFromRepo = await _animal_repo.GetAnimal(id);

            _mapper.Map(animalForUpdateDto, animalFromRepo);

            if (await _animal_repo.SaveAll())
                return NoContent();
            throw new System.Exception($"Updating animal failed on save");
        }


        [AllowAnonymous]
        [HttpGet("{id}/tags")]
        public async Task<IActionResult> GetTags(int id)
        {
            var tags = await _animal_repo.GetTags(id);
            return Ok(tags); //returns either no content or a Tag object
        }


        [HttpDelete("{id}/tags")]
        public async Task<IActionResult> DeleteTag(string tagContent, int animalId)
        {
            // if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();
            
            var tagToDelete = await _animal_repo.GetTag(tagContent, animalId);
            _animal_repo.Delete(tagToDelete);

            if (await _animal_repo.SaveAll())
                return Ok();
            
            return BadRequest("Failed to delete the tag");
        }

    }

}