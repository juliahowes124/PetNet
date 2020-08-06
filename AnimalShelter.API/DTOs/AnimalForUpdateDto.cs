using System;
using System.Collections.Generic;
using AnimalShelter.API.Models;

namespace AnimalShelter.API.DTOs
{
    public class AnimalForUpdateDto
    {
        public string Name { get; set; }
        public string Species { get; set; }
        public string Description { get; set; }
        public string Gender { get; set; }
        public DateTime TimeLeftToAdopt { get; set; }
        public int UserId { get; set; } 
        public string PhotoUrl { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}