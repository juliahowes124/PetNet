using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AnimalShelter.API.Helpers;
using AnimalShelter.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AnimalShelter.API.Data
{
    public class AnimalRepository : IAnimalRepository
    {
        private readonly DataContext _context;
        public AnimalRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Animal> GetAnimal(int id)
        {
            var animal = await _context.Animals.Include(p => p.Photos).Include(t => t.Tags).Include(s => s.Savers).FirstOrDefaultAsync(a => a.Id == id);
            return animal;
        }

        public async Task<PagedList<Animal>> GetAnimals(AnimalParams animalParams)
        {
            var animals = _context.Animals.Include(p => p.Photos).Include(s => s.Savers).OrderBy(a => a.AdoptBy).AsQueryable();

            if (animalParams.Savees)
            {
                var userSavees = await GetUserSavees(animalParams.UserId);
                animals = animals.Where(a => userSavees.Contains(a.Id));
            }

            if (animalParams.MinAge != 18 || animalParams.MaxAge != 100)
            {
                var minAge = animalParams.MinAge;
                var maxAge = animalParams.MaxAge;
                animals = animals.Where(a => a.Age >= minAge && a.Age <= maxAge);
            }

            if (!string.IsNullOrEmpty(animalParams.OrderBy))
            {
                switch(animalParams.OrderBy)
                {
                    case "Saves":
                        animals = animals.OrderBy(a => a.Savers.Count);
                        break;
                    default:
                        animals = animals.OrderBy(a => a.AdoptBy);
                        break;
                }
            }
            if (!string.IsNullOrEmpty(animalParams.Gender)) {
                var gender = animalParams.Gender;
                animals = animals.Where(a => a.Gender == gender);
            }
            if (!string.IsNullOrEmpty(animalParams.Species)) {
                var species = animalParams.Species;
                animals = animals.Where(a => a.Species == species);
            }
            return await PagedList<Animal>.CreateAsync(animals, animalParams.PageNumber, animalParams.PageSize);
        }

        private async Task<IEnumerable<int>> GetUserSavees(int id)
        {
            var user = await _context.Users.Include(x => x.Savees)
            .FirstOrDefaultAsync(u => u.Id == id);

            return user.Savees.Where(a => a.SaverId == id).Select(i => i.SaveeId);
        }

        public async Task<Photo> GetMainPhoto(int animalId)
        {
            return await _context.Photos.Where(u => u.AnimalId == animalId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            return await _context.Photos.FirstOrDefaultAsync( a=> a.Id == id );
        }
        public async Task<Tag> GetTag(string content, int animalId)
        {
            return await _context.Tags.Where(t => t.AnimalId == animalId).FirstOrDefaultAsync(t => t.Content == content);
        }

        public async Task<IEnumerable<Tag>> GetTags(int animalId)
        {
            return await _context.Tags.Where(t => t.AnimalId == animalId).ToListAsync();
        }

        public async Task<Animal> Register(Animal animal)
        {
            await _context.Animals.AddAsync(animal);
            await _context.SaveChangesAsync();

            return animal;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}