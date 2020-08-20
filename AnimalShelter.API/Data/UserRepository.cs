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
            var user = _context.Users.Include(a => a.Animals).Include(p => p.ProfilePicture)
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

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams)
        {
            var messages = _context.Messages
                .Include(u => u.Sender)
                .Include(u => u.Recipient)
                .AsQueryable();

            switch (messageParams.MessageContainer)
            {
                case "Inbox":
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId && u.RecipientDeleted == false);
                    break;
                case "Outbox":
                    messages = messages.Where(u => u.SenderId == messageParams.UserId && u.SenderDeleted == false);
                    break;
                default:
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId && u.RecipientDeleted==false && u.IsRead == false);
                    break;

            }

            messages = messages.OrderByDescending(d => d.MessageSent);
            return await PagedList<Message>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            var messages = await _context.Messages
            .Include(u => u.Sender)
            .Include(u => u.Recipient)
            .Where(m => m.RecipientId == userId && m.RecipientDeleted == false 
                && m.SenderId == recipientId 
                || m.RecipientId == recipientId && m.SenderId == userId 
                && m.SenderDeleted == false)
            .OrderByDescending(m => m.MessageSent)
            .ToListAsync();

            return messages;
        }

        public async Task<UserPhoto> GetUserPhoto(int id)
        {
            var photo = await _context.UserPhotos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

    }
}