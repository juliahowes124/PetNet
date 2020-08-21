using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AnimalShelter.API.Models;

namespace AnimalShelter.API.DTOs
{
    public class AnimalForRegisterDto
    {
        [Required]
        public string Name { get; set; }
        public string Species { get; set; }
        public string Breed { get; set; }
        public int AgeYears { get; set; }
        public int AgeMonths { get; set; }
        public string Gender { get; set; }
        public DateTime Posted { get; set; }
        public DateTime AdoptBy { get; set; }
        public int UserId { get; set; } 
        public int AdoptionFee { get; set; }
        public ICollection<Tag> Tags { get; set; }

        public AnimalForRegisterDto()
        {
            Posted = DateTime.Now;
        }
    }
}