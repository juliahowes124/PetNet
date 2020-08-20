using System;
using System.Collections.Generic;

namespace AnimalShelter.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string KnownAs { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public DateTime LastActive { get; set; }
        public ICollection<Animal> Animals { get; set; }
        public ICollection<Save> Savees { get; set; }
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesRecieved { get; set; }
        public ICollection<UserPhoto> ProfilePicture { get; set; }
    }
}