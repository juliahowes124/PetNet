using System.Threading.Tasks;
using AnimalShelter.API.Data;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AnimalShelter.API.DTOs;
using System.Collections.Generic;

namespace AnimalShelter.API.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();
            // var usersToReturn = _mapper.Map<IEnumerable<UserForInfoDto>>(users);

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            // var userToReturn = _mapper.Map<UserForInfoDto>(user);
            return Ok(user);
        }
    }
}