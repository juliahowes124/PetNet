using System.Collections.Generic;
using System.Threading.Tasks;
using AnimalShelter.API.Helpers;
using AnimalShelter.API.Models;

namespace AnimalShelter.API.Data
{
    public interface IAnimalRepository
    {
        void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll(); //check to see if theres one or more changes that were saved (false indicates no changes, or failed to save)
         Task<PagedList<Animal>> GetAnimals(AnimalParams animalParams);
         Task<Animal> GetAnimal(int id);
         Task<Animal> Register(Animal animal);
         Task<Photo> GetPhoto(int id);
         Task<Photo> GetMainPhoto(int animalId);
         Task<IEnumerable<Tag>> GetTags(int animalId);
        Task<Save> GetSave(int userId, int animalId);
    }
}