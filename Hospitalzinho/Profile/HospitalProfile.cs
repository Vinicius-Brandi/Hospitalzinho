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
            // Sala
            CreateMap<Sala, SalaDto>()
                .ForMember(dest => dest.Tipo, opt => opt.MapFrom(src => (int)src.Tipo))
                .ForMember(dest => dest.Consultas, opt => opt.Ignore());


            // Profissional
            CreateMap<ProfissionalSaude, ProfissionalDto>()
                 .ForMember(dest => dest.Internacoes, opt => opt.MapFrom(src => src.Internacoes))
                 .ForMember(dest => dest.Consultas, opt=> opt.MapFrom(src=>src.Consultas))
                 .ForMember(dest => dest.Cirurgias, opt=> opt.MapFrom(src=>src.Cirurgias))
                 .ForMember(dest => dest.ExamesSolicitados, opt=> opt.MapFrom(src=>src.ExamesSolicitados))
                 .ForMember(dest => dest.VacinacoesAdministradas, opt => opt.MapFrom(src=>src.VacinacoesAdministradas))
                 .ForMember(dest => dest.ReceitasPrescritas, opt => opt.MapFrom(src=>src.ReceitasPrescritas));

            //Especialidade
            CreateMap<Especialidade, EspecialidadeDto>();


            //Internacao
            CreateMap<PacienteInternacao, InternacaoDto>()
                .ForMember(dest => dest.Paciente, opt => opt.MapFrom(src => src.Prontuario.Paciente.Nome))
                .ForMember(dest => dest.Quarto, opt => opt.MapFrom(src => src.Quarto.Numero))
                .ForMember(dest => dest.Hospital, opt => opt.MapFrom(src => src.Hospital.Nome))
                .ForMember(dest => dest.ProfResponsavel, opt => opt.MapFrom(src => src.ProfResponsavel.Nome))
                .ForMember(dest => dest.ProfRegistro, opt => opt.MapFrom(src => src.ProfResponsavel.RegistroProfissional)); ;
            ;

            //Consulta
            CreateMap<PacienteConsulta, ConsultaDto>()
                .ForMember(dest => dest.Paciente, opt => opt.MapFrom(src => src.Prontuario.Paciente.Nome))
                .ForMember(dest => dest.Sala, opt => opt.MapFrom(src => src.Sala.Numero))
                .ForMember(dest => dest.Hospital, opt => opt.MapFrom(src => src.Hospital.Nome))
                .ForMember(dest => dest.ProfResponsavel, opt => opt.MapFrom(src => src.ProfResponsavel.Nome))
                .ForMember(dest => dest.ProfRegistro, opt => opt.MapFrom(src => src.ProfResponsavel.RegistroProfissional));

            //Cirurgia
            CreateMap<PacienteCirurgia, CirurgiaDto>()
                .ForMember(dest => dest.Paciente, opt => opt.MapFrom(src => src.Prontuario.Paciente.Nome))
                .ForMember(dest => dest.Sala, opt => opt.MapFrom(src => src.Sala.Numero))
                .ForMember(dest => dest.Hospital, opt => opt.MapFrom(src => src.Hospital.Nome))
                .ForMember(dest => dest.ProfResponsavel, opt=> opt.MapFrom(src=> src.ProfResponsavel.Nome))
                .ForMember(dest => dest.ProfRegistro, opt => opt.MapFrom(src => src.ProfResponsavel.RegistroProfissional));

            //Exame
            CreateMap<PacienteExame, ExameDto>()
                .ForMember(dest => dest.Paciente, opt => opt.MapFrom(src => src.Prontuario.Paciente.Nome))
                .ForMember(dest => dest.ProfResponsavel, opt => opt.MapFrom(src => src.ProfResponsavel.Nome))
                .ForMember(dest => dest.ProfRegistro, opt => opt.MapFrom(src => src.ProfResponsavel.RegistroProfissional))
                .ForMember(dest => dest.Hospital, opt => opt.MapFrom(src => src.Hospital.Nome));

            //Vacinacao
            CreateMap<PacienteVacinacao, VacinacaoDto>()
                .ForMember(dest => dest.Paciente, opt => opt.MapFrom(src => src.Prontuario.Paciente.Nome))
                .ForMember(dest => dest.ProfResponsavel, opt => opt.MapFrom(src => src.ProfResponsavel.Nome))
                .ForMember(dest => dest.ProfRegistro, opt => opt.MapFrom(src => src.ProfResponsavel.RegistroProfissional))
                .ForMember(dest => dest.Hospital, opt => opt.MapFrom(src => src.Hospital.Nome))
                .ForMember(dest => dest.Vacina, opt => opt.MapFrom(src => src.Vacina.VacinaModelo.Nome));

            //Receita
            CreateMap<Receita, ReceitaDto>()
                .ForMember(dest => dest.Paciente, opt => opt.MapFrom(src => src.Paciente.Nome))
                .ForMember(dest => dest.ProfResponsavel, opt => opt.MapFrom(src => src.Profissional.Nome))
                .ForMember(dest => dest.ProfRegistro, opt => opt.MapFrom(src => src.Profissional.RegistroProfissional))
                .ForMember(dest => dest.Hospital, opt => opt.MapFrom(src => src.Hospital.Nome))
                .ForMember(dest => dest.Itens, opt => opt.MapFrom(src => src.Itens));

            //ItemReceita
            CreateMap<ItemReceita, ItemReceitaDto>();
        }
    }
}
