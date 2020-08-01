using System;

namespace AnimalShelter.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public int AnimalId { get; set; }
        public int UserId { get; set; }
    }
}