using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AnimalShelter.API.Helpers;
using AnimalShelter.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AnimalShelter.API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
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

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<PagedList<User>> GetUsers(AnimalParams animalParams)
        {
            var users = _context.Users.Include(a=>a.Animals).AsQueryable();

            if (animalParams.Savers)
            {
                var animalSavers = await GetAnimalSavers(animalParams.AnimalId);
                users = users.Where(u => animalSavers.Contains(u.Id));
            }
            return await PagedList<User>.CreateAsync(users, animalParams.PageNumber, animalParams.PageSize);
        }

        public Task<User> GetUser(int id)
        {
            var user = _context.Users.Include(a => a.Animals)
            .FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<Save> GetSave(int userId, int animalId)
        {
            return await _context.Saves.FirstOrDefaultAsync(u => u.SaverId == userId && u.SaveeId == animalId);
        }

        private async Task<IEnumerable<int>> GetAnimalSavers(int id)
        {
            var animal = await _context.Animals.Include(x => x.Savers)
            .FirstOrDefaultAsync(a => a.Id == id);

            return animal.Savers.Where(a => a.SaveeId == id).Select(i => i.SaverId);
        }
    }
}