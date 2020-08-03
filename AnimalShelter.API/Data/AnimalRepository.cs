using System.Collections.Generic;
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
            var animal = await _context.Animals.Include(p => p.Photos).FirstOrDefaultAsync(a => a.Id == id);
            return animal;
        }

        public async Task<IEnumerable<Animal>> GetAnimals()
        {
            var animals = await _context.Animals.Include(p => p.Photos).ToListAsync();
            return animals;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}