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
        public string Description { get; set; }
        public string Gender { get; set; }
        public DateTime Posted { get; set; }
        public DateTime TimeLeftToAdopt { get; set; }
        public int UserId { get; set; } 
        public string Username { get; set; }
        public string UserKnownAs { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}