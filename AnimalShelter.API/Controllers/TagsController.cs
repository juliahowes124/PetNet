

using System.Threading.Tasks;
using AnimalShelter.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace AnimalShelter.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly IAnimalRepository _repo;

        public TagsController(IAnimalRepository repo)
        {
            _repo = repo;

        }

        [HttpGet]
        public async Task<IActionResult> GetAnimals()
        {
            var tags = await _repo.GetTags();
            return Ok(tags);
        }
    }
}