namespace AnimalShelter.API.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Type { get; set; }
        public int AnimalId { get; set; }
    }
}