using AutoMapper;
using HospitalzinhoAPI.DTO.Paciente;
using HospitalzinhoAPI.Models.Hospital.Paciente;

namespace HospitalzinhoAPI.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PacienteModel, PacienteDTO>();
            CreateMap<PacienteEndereco, PacienteEnderecoDTO>();
            CreateMap<PacienteContato, PacienteContatoDTO>();

            CreateMap<PacienteDTO, PacienteModel>();
            CreateMap<PacienteEnderecoDTO, PacienteEndereco>();
            CreateMap<PacienteContatoDTO, PacienteContato>();
        }
    }
}
