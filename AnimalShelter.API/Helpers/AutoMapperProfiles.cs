using AnimalShelter.API.Models;
using AutoMapper;
using AnimalShelter.API.DTOs;
using System.Linq;

namespace AnimalShelter.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForInfoDto>();
            CreateMap<Animal, AnimalForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt => 
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(a => a.Saves, opt =>
                opt.MapFrom(src => src.Savers.Count))
            .ForMember(a => a.Savers, opt =>
                opt.MapFrom(src => src.Savers.Select(s => s.SaverId)));
            CreateMap<Animal, AnimalForDetailDto>()
            .ForMember(dest => dest.PhotoUrl, opt => 
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(a => a.Likes, opt =>
                opt.MapFrom(src => src.Tags.Where(t=> t.Type == "like").Select(t => t.Content)))
            .ForMember(a => a.Qualities, opt =>
                opt.MapFrom(src => src.Tags.Where(t => t.Type == "quality").Select(t => t.Content)))
            .ForMember(a => a.GoodWith, opt =>
                opt.MapFrom(src => src.Tags.Where(t => t.Type == "goodWith").Select(t => t.Content)))
            .ForMember(a => a.Saves, opt =>
                opt.MapFrom(src => src.Savers.Count));
            CreateMap<User, AnimalForDetailDto>()
            .ForMember(u => u.UserKnownAs, opt =>
                opt.MapFrom(src => src.KnownAs))
            .ForMember(u => u.Username, opt=>
                opt.MapFrom(src => src.Username))
            .ForMember(u => u.UserPhotoUrl, opt =>
                opt.MapFrom(src => src.ProfilePictureUrl));

            CreateMap<UserForRegisterDto, User>();
            CreateMap<AnimalForRegisterDto, Animal>();
            CreateMap<AnimalForUpdateDto, Animal>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<TagForCreationDto, Tag>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>();
        }
    }
}