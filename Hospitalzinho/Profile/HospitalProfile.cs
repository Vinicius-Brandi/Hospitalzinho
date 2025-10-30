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

            // Ala
            CreateMap<Ala, AlaDto>()
                .ForMember(dest => dest.Quartos, opt => opt.MapFrom(src => src.Quartos))
                .ForMember(dest => dest.Salas, opt => opt.MapFrom(src => src.Salas))
                .ForMember(dest => dest.Hospital, opt => opt.MapFrom(src => src.Hospital));


            // Quarto
            CreateMap<Quarto, QuartoDto>()
                .ForMember(dest => dest.Internacoes, opt => opt.MapFrom(src => src.Internacoes));

            // Sala
            CreateMap<Sala, SalaDto>()
                .ForMember(dest => dest.Consultas, opt => opt.MapFrom(src => src.Consultas));


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

            //PacienteContato
            CreateMap<PacienteContato, PacienteContatoDto>()
                .ForMember(dest => dest.Dono, opt => opt.MapFrom(src => src.Paciente.Nome));

            //PacienteEndereco
            CreateMap<PacienteEndereco, PacienteEnderecoDto>();

            //Paciente
            CreateMap<Paciente, PacienteDto>()
                .ForMember(dest => dest.Contatos, opt => opt.MapFrom(src => src.Contatos))
                .ForMember(dest => dest.Enderecos, opt => opt.MapFrom(src => src.Enderecos));

            //PacienteProntuario
            CreateMap<PacienteProntuario, ProntuarioDto>()
                .ForMember(dest => dest.Paciente, opt => opt.MapFrom(src => src.Paciente))
                .ForMember(dest => dest.DoencasCronicas, opt => opt.MapFrom(src => src.DoencasCronicas))
                .ForMember(dest => dest.MedicacoesContinuas, opt => opt.MapFrom(src => src.MedicacoesContinuas))
                .ForMember(dest => dest.Cirurgias, opt => opt.MapFrom(src => src.Cirurgias))
                .ForMember(dest => dest.Vacinacoes, opt => opt.MapFrom(src => src.Vacinacoes))
                .ForMember(dest => dest.Consultas, opt => opt.MapFrom(src => src.Consultas))
                .ForMember(dest => dest.Internacoes, opt => opt.MapFrom(src => src.Internacoes))
                .ForMember(dest => dest.Exames, opt => opt.MapFrom(src => src.Exames));

            //PacienteDoenca
            CreateMap<PacienteDoencaCronica, PacienteDoencaDto>()
                .ForMember(dest => dest.Paciente, opt => opt.MapFrom(src => src.Prontuario.Paciente.Nome))
                .ForMember(dest => dest.PacienteCNS, opt => opt.MapFrom(src => src.Prontuario.Paciente.CNS));

            //PacienteMedicacao
            CreateMap<PacienteMedicacao, PacienteMedicacaoDto>()
                .ForMember(dest => dest.Paciente, opt => opt.MapFrom(src => src.Prontuario.Paciente.Nome));

            //Medicamento
            CreateMap<Medicamento, MedicamentoDto>()
                .ForMember(dest => dest.Hospital, opt => opt.MapFrom(src => src.Hospital.Nome));

            //Convenio
            CreateMap<Convenio, ConvenioDto>()
                .ForMember(dest => dest.PacienteConvenios, opt => opt.MapFrom(src => src.PacienteConvenios))
                .ForMember(dest => dest.HospitaisAtentidos, opt => opt.MapFrom(src => src.HospitaisAtentidos));

            //ConvenioPaciente
            CreateMap<PacienteConvenio, PacienteConvenioDto>()
                .ForMember(dest => dest.PacienteNome, opt => opt.MapFrom(src => src.Paciente.Nome))
                .ForMember(dest => dest.PacienteCpf, opt => opt.MapFrom(src => src.Paciente.Cpf))
                .ForMember(dest => dest.ConvenioCNPJ, opt => opt.MapFrom(src => src.Convenio.CNPJ));


        }
    }
}
