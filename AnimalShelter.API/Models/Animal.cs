using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices;

namespace AnimalShelter.API.Models
{
    public class Animal
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Species { get; set; }
        public string Breed { get; set; }
        public string Description { get; set; }
        public int? AdoptionFee { get; set; }
        public int AgeYears { get; set; }
        public int AgeMonths { get; set; }
        public string Gender { get; set; }
        public DateTime Posted { get; set; }
        public DateTime? AdoptBy { get; set; }
        public int Views { get; set; }
        public int UserId { get; set; } 
        public ICollection<Tag> Tags { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Save> Savers { get; set; }
    }
}