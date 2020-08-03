using System.Threading.Tasks;
using AnimalShelter.API.Data;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalShelter.API.Controllers
{
    [Authorize]
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
            return Ok(animals);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAnimal(int id)
        {
            var animal = await _repo.GetAnimal(id);
            return Ok(animal);
        }

    }

}