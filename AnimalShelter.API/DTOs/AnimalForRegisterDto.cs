using System;
using System.ComponentModel.DataAnnotations;

namespace AnimalShelter.API.DTOs
{
    public class AnimalForRegisterDto
    {
        [Required]
        public string Name { get; set; }
        public string Species { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public DateTime Posted { get; set; }
        public DateTime AdoptBy { get; set; }
        public int UserId { get; set; } 

        public AnimalForRegisterDto()
        {
            Posted = DateTime.Now;
        }
    }
}