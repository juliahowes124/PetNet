namespace AnimalShelter.API.DTOs
{
    public class UserForUpdateDto
    {
        public string Username { get; set; }
        public string KnownAs { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PhotoUrl { get; set; }
    }
}