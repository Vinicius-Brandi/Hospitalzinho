using FGB.Entidades;
using Hospitalzinho.Entidades;
using Hospitalzinho.Enum;

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
        public EscolaridadePaciente? Escolaridade { get; set; }
        public List<PacienteContatoDto> Contatos { get; set; } = new();
        public List<PacienteEnderecoDto> Enderecos { get; set; } = new();
    }


    public class PacienteContatoDto : EntidadeBase
    {
        public string Dono { get; set; }
        public string TelefoneResidencial { get; set; }
        public string TelefoneCelular { get; set; }
        public string Email { get; set; }
    }

    public class PacienteEnderecoDto :  EntidadeBase
    {
        public string Logradouro { get; set; }
        public string Numero { get; set; }
        public string Complemento { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Cep { get; set; }
    }

    public class ProntuarioDto : EntidadeBase
    {
        public PacienteDto Paciente { get; set; }
        public TipoSanguineo TipoSangue { get; set; }
        public List<Alergia> Alergias { get; set; } = new();
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
}
