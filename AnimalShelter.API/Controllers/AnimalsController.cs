using System.Collections.Generic;
using System.Threading.Tasks;
using AnimalShelter.API.Data;
using AnimalShelter.API.DTOs;
using AnimalShelter.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalShelter.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalsController : ControllerBase
    {
        private readonly IAnimalRepository _repo;
        private readonly IMapper _mapper;
        
        public AnimalsController(IAnimalRepository repo, IMapper mapper)
        {
            _repo=repo;
            _mapper=mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAnimals()
        {
            var animals = await _repo.GetAnimals();
            var animalsToReturn = _mapper.Map<IEnumerable<AnimalForListDto>>(animals);
            return Ok(animalsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAnimal(int id)
        {
            var animal = await _repo.GetAnimal(id);
            return Ok(animal);
        }

    }

}