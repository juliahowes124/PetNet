using AnimalShelter.API.Models;
using AutoMapper;
using AnimalShelter.API.DTOs;

namespace AnimalShelter.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForInfoDto>();
        }
    }
}