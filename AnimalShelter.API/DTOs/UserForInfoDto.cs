using System;

namespace AnimalShelter.API.DTOs
{
    public class UserForInfoDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string KnownAs { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public DateTime LastActive { get; set; }
        public string ProfilePictureUrl { get; set; }
        // public ICollection<Animal> Animals { get; set; }
    }
}