using System;

namespace AnimalShelter.API.Models
{
    public class UserPhoto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public int UserId { get; set; }
        public string PublicId { get; set; }
    }
}