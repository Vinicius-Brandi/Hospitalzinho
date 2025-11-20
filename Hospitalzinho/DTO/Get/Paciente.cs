using FGB.Entidades;
using Hospitalzinho.Entidades;
using Hospitalzinho.Enum;
using System.ComponentModel.DataAnnotations;

namespace Hospitalzinho.DTO.Get
{
    public class PacienteDto : EntidadeBase
    {
        public string Nome { get; set; }
        public string CNS { get; set; }
        public string Cpf { get; set; }
        public DateTime DataNascimento { get; set; }
        public string? NomePai { get; set; }
        public string? NomeMae { get; set; }
        public string? CpfPai { get; set; }
        public string? CpfMae { get; set; }
        public bool? Ativo { get; set; }
        public SexoPaciente? Sexo { get; set; }
        public string? Nacionalidade { get; set; }
        public RacaPaciente? Raca { get; set; }
        public string? Naturalidade { get; set; }
        public TipoSanguineo TipoSanguineo { get; set; }
        public EscolaridadePaciente? Escolaridade { get; set; }
    }

    public class ProntuarioDto : EntidadeBase
    {
        public PacienteDto Paciente { get; set; }
        public TipoSanguineo TipoSangue { get; set; }
        public List<PacienteAlergia> Alergias { get; set; } = new();
        public List<PacienteDoencaDto> DoencasCronicas { get; set; } = new();

        public List<PacienteMedicacaoDto> MedicacoesContinuas { get; set; } = new();
        public List<CirurgiaDto> Cirurgias { get; set; } = new();
        public List<VacinacaoDto> Vacinacoes { get; set; } = new();
        public DateTime DataAbertura { get; set; }
        public DateTime UltimaAtualizacao { get; set; }

        public List<ConsultaDto> Consultas { get; set; } = new();
        public List<InternacaoDto> Internacoes { get; set; } = new();
        public List<ExameDto> Exames { get; set; } = new();
    }

    public class PacienteAlergiaDto : PacienteAlergia
    {
        public string Paciente { get; set; }

        public Alergia Alergia { get; set; }

        public string? Observacao { get; set; }
    }
}
