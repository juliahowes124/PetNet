namespace AnimalShelter.API.Helpers
{
    public class AnimalParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 5;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize: value ;}
        }
        public string Gender { get; set; }
        public int MinAge { get; set; } = 0;
        public int MaxAge { get; set; } = 100;
        public string Species { get; set; }
        public string OrderBy { get; set; }
        public bool Savees { get; set; } = false;
        public bool Savers { get; set; } = false;
        public int UserId { get; set; }
        public int AnimalId { get; set; }
        
    }
}