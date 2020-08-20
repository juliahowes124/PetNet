using System;
using System.Collections.Generic;
using AnimalShelter.API.Models;

namespace AnimalShelter.API.DTOs
{
    public class AnimalForUpdateDto
    {
        public string Name { get; set; }
        public string Species { get; set; }
        public string Breed { get; set; }
        public string Description { get; set; }
        public string Gender { get; set; }
        public int AdoptionFee { get; set; }
        public int AgeYears { get; set; }
        public int AgeMonths { get; set; }
        public DateTime AdoptBy { get; set; }
        public int UserId { get; set; } 
        public string PhotoUrl { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}