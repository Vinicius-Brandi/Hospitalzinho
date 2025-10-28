using AutoMapper;
using Hospitalzinho.Entidades;
using Hospitalzinho.DTO.Get;
using System.Linq;

namespace Hospitalzinho.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Hospital
            CreateMap<Hospital, HospitalDto>();

            // Unidade hospitalar
            CreateMap<HospitalUnidade, HospitalUnidadeDto>()
                .ForMember(dest => dest.TipoUnidade, opt => opt.MapFrom(src => (int)src.TipoUnidade))
                .ForMember(dest => dest.Endereco, opt => opt.MapFrom(src => src.Endereco));

            // Endereço
            CreateMap<HospitalEndereco, HospitalEnderecoDto>();

            // Ala
            CreateMap<Ala, AlaDto>()
                .ForMember(dest => dest.Quartos, opt => opt.MapFrom(src => src.Quartos))
                .ForMember(dest => dest.Salas, opt => opt.MapFrom(src => src.Salas));


            // Quarto
            CreateMap<Quarto, QuartoDto>()
                .ForMember(dest => dest.Tipo, opt => opt.MapFrom(src => (int)src.Tipo))
                .ForMember(dest => dest.Internacoes, opt => opt.Ignore());

            // Sala
            CreateMap<Sala, SalaDto>()
                .ForMember(dest => dest.Tipo, opt => opt.MapFrom(src => (int)src.Tipo))
                .ForMember(dest => dest.Consultas, opt => opt.MapFrom((src, dest) =>
                    src.Consultas.Select(c =>
                        c.ProfResponsavel != null
                            ? $"{c.ProfResponsavel.Nome} ({c.ProfResponsavel.Especialidade.Nome})"
                            : "Sem profissional responsável"
                    ).ToList()
                ));
        }
    }
}
