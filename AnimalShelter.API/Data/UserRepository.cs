using System.Collections.Generic;
using System.Threading.Tasks;
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

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(a=>a.Animals).ToListAsync();
            return users;
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
    }
}