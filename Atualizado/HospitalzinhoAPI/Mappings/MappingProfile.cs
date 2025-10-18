using AutoMapper;
using HospitalzinhoAPI.DTO.Hospital.Prontuario;
using HospitalzinhoAPI.DTO.Paciente;
using HospitalzinhoAPI.Models.Hospital.Paciente;
using HospitalzinhoAPI.Models.Hospital.Prontuario;

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

            CreateMap<ProntuarioAlergiaDTO, ProntuarioAlergia>();
            CreateMap<ProntuarioInternacaoDTO, ProntuarioInternacao>();
            CreateMap<ProntuarioConsultaDTO, ProntuarioConsulta>();
            CreateMap<ProntuarioVacinaDTO, ProntuarioVacina>();

            CreateMap<ProntuarioAlergia, ProntuarioAlergiaDTO>();
            CreateMap<ProntuarioInternacao, ProntuarioInternacaoDTO>();
            CreateMap<ProntuarioConsulta, ProntuarioConsultaDTO>();
            CreateMap<ProntuarioVacina, ProntuarioVacinaDTO>();
        }
    }
}
