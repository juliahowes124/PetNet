using System.Threading.Tasks;
using AnimalShelter.API.Data;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AnimalShelter.API.DTOs;
using System.Collections.Generic;
using AnimalShelter.API.Models;
using System.Security.Claims;
using AnimalShelter.API.Helpers;

namespace AnimalShelter.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        private readonly IAnimalRepository _animal_repo;
        public UsersController(IUserRepository repo, IMapper mapper, IAnimalRepository animal_repo)
        {
            _animal_repo = animal_repo;
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery]AnimalParams animalParams)
        {
            var users = await _repo.GetUsers(animalParams);
            var usersToReturn = _mapper.Map<IEnumerable<UserForInfoDto>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize, 
                users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }

        [AllowAnonymous]
        [HttpGet("{id}", Name="GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var userToReturn = _mapper.Map<UserForInfoDto>(user);
            return Ok(userToReturn);
        }

        [HttpPut("{id}", Name = "UpdateUser")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            throw new System.Exception($"Updating user {id} failed on save");
        }

        [HttpPost("{userId}/save/{animalId}")]
        public async Task<IActionResult> SaveAnimal(int userId, int animalId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var save = await _repo.GetSave(userId, animalId);
            if (save != null)
                return BadRequest("You already like this pet");

            if (await _animal_repo.GetAnimal(animalId) == null)
                return NotFound();

            save = new Save
            {
                SaverId = userId,
                SaveeId = animalId
            };

            _repo.Add<Save>(save);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to save animal");
        }

        [HttpDelete("{userId}/save/{animalId}")]
        public async Task<IActionResult> DeleteSave(int userId, int animalId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var saveToDelete = await _animal_repo.GetSave(userId, animalId);
            _animal_repo.Delete(saveToDelete);

            if (await _animal_repo.SaveAll())
                return Ok();
            
            return BadRequest("Failed to delete the tag");
        }
    }
}