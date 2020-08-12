namespace AnimalShelter.API.Models
{
    public class Save
    {
        public int SaverId { get; set; }
        public int SaveeId { get; set; }
        public User Saver { get; set; }
        public Animal Savee { get; set; }
    }
}