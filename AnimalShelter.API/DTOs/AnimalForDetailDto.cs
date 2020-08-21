using System;
using System.Collections.Generic;
using AnimalShelter.API.Models;

namespace AnimalShelter.API.DTOs
{
    public class AnimalForDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Species { get; set; }
        public string Breed { get; set; }
        public string Description { get; set; }
        public int AdoptionFee { get; set; }
        public int AgeYears { get; set; }
        public int AgeMonths { get; set; }
        public string Gender { get; set; }
        public DateTime Posted { get; set; }
        public DateTime AdoptBy { get; set; }
        public int Views { get; set; }
        public int Saves { get; set; }
        public int Inquiries { get; set; }
        public int UserId { get; set; } 
        public string Username { get; set; }
        public string UserKnownAs { get; set; }
        public DateTime UserLastActive { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string UserPhotoUrl { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public bool Adopted { get; set; }
        public ICollection<Tag> Tags { get; set; }
    }
}