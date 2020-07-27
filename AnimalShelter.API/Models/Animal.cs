using System;
using System.Collections.Generic;

namespace AnimalShelter.API.Models
{
    public class Animal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public string Species { get; set; }
        public DateTime InShelterSince { get; set; }
    }
}