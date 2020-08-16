using System.Collections.Generic;
using System.Threading.Tasks;
using AnimalShelter.API.Helpers;
using AnimalShelter.API.Models;

namespace AnimalShelter.API.Data
{
    public interface IUserRepository
    {
        void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll(); //check to see if theres one or more changes that were saved (false indicates no changes, or failed to save)
         Task<PagedList<User>> GetUsers(AnimalParams animalParams);
         Task<User> GetUser(int id);
         Task<Save> GetSave(int userId, int animalId);
         Task<Message> GetMessage(int id);
         Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);
         Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
    }
}