using System.Collections.Generic;
using AnimalShelter.API.Models;

namespace AnimalShelter.API.DTOs
{
    public class AnimalForDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Species { get; set; }
        // public DateTime InShelterSince { get; set; }
        // public DateTime TimeLeftToAdopt { get; set; }
        public int UserId { get; set; } 
        public string UserCity { get; set; }
        public string UserState { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}