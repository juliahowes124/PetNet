using System;

namespace AnimalShelter.API.DTOs
{
    public class AnimalForListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Species { get; set; }
        public int AgeYears { get; set; }
        public int AgeMonths { get; set; }
        public string Gender { get; set; }
        public DateTime Posted { get; set; }
        public DateTime AdoptBy { get; set; }
        public int UserId { get; set; } 
        public string PhotoUrl { get; set; }
        public int Views { get; set; }
        public int Saves { get; set; }
        public int Inquiries { get; set; }
        public int[] Savers { get; set; }
    }
}