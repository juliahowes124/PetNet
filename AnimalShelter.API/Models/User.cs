using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace AnimalShelter.API.Models
{
    public class User : IdentityUser<int>
    {
        public string KnownAs { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public DateTime LastActive { get; set; }
        public virtual ICollection<Animal> Animals { get; set; }
        public virtual ICollection<Save> Savees { get; set; }
        public virtual ICollection<Message> MessagesSent { get; set; }
        public virtual ICollection<Message> MessagesRecieved { get; set; }
        public virtual ICollection<UserPhoto> ProfilePicture { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}