using System.ComponentModel.DataAnnotations;

namespace AnimalShelter.API.DTOs
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 4, ErrorMessage = "You must specify a password between 4 and 20 characters")]
        public string Password { get; set; }   

        [Required]
        public string KnownAs { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }
    }
}