using System.Collections.Generic;

namespace AnimalShelter.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        // public Photo ProfilePicture { get; set; }
        // public string KnownAs { get; set; }
        // public string PermissionLevel { get; set; }
        // public ICollection<Photo> Animals { get; set; }
    }
}