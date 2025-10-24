using AutoMapper;
using Hospitalzinho.DTO;
using Hospitalzinho.Entidades;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Hospitalzinho.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Hospital, HospitalDto>();

            CreateMap<HospitalUnidade, HospitalUnidadeDto>()
                .ForMember(dest => dest.TipoUnidade, opt => opt.MapFrom(src => src.TipoUnidade.ToString()))
                .ForMember(dest => dest.Endereco, opt => opt.MapFrom(src =>
                    src.Endereco != null
                        ? $"{src.Endereco.Rua}, {src.Endereco.Numero} - {src.Endereco.Bairro}, {src.Endereco.Cidade} ({src.Endereco.CEP})"
                        : string.Empty
                ));
        }
    }
}
