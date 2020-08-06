using System;
using System.Collections.Generic;

namespace AnimalShelter.API.Models
{
    public class Animal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Species { get; set; }
        public string Breed { get; set; }
        public string Description { get; set; }
        public int AdoptionFee { get; set; }
        public string Likes { get; set; }
        public string Qualities { get; set; }
        public string GoodWith { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public DateTime Posted { get; set; }
        public DateTime TimeLeftToAdopt { get; set; }
        public int Views { get; set; }
        public int Saves { get; set; }
        public int Inquiries { get; set; }
        public int UserId { get; set; } 
        public ICollection<Photo> Photos { get; set; }
    }
}