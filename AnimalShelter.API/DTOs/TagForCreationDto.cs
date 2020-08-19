namespace AnimalShelter.API.DTOs
{
    public class TagForCreationDto
    {
        public string Content { get; set; }
        public string Type { get; set; }

         public TagForCreationDto(string content, string type)
        {
            this.Content = content;
            this.Type = type;
            
        }

    }
}