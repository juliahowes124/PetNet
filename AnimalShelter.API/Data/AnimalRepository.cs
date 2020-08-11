using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            var animal = await _context.Animals.Include(p => p.Photos).Include(t => t.Tags).FirstOrDefaultAsync(a => a.Id == id);
            return animal;
        }

        public async Task<IEnumerable<Animal>> GetAnimals()
        {
            var animals = await _context.Animals.Include(p => p.Photos).ToListAsync();
            return animals;
        }

        public async Task<Photo> GetMainPhoto(int animalId)
        {
            return await _context.Photos.Where(u => u.AnimalId == animalId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            return await _context.Photos.FirstOrDefaultAsync( a=> a.Id == id );
        }

        // public async Task<Tag> GetTag(string content, int animalId)
        // {
        //     return await _context.Tags.Where(t => t.AnimalId == animalId).FirstOrDefaultAsync(t => t.Content == content);
        // }

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