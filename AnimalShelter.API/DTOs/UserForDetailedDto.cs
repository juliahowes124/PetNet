using System;

namespace AnimalShelter.API.DTOs
{
    public class UserForDetailedDto
    {
         public int Id { get; set; }
        public string Username { get; set; }
        public string KnownAs { get; set; }
        public DateTime LastActive { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PhotoUrl { get; set; }
    }
}