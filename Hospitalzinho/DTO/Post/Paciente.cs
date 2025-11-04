using FGB.Entidades;
using Hospitalzinho.Enum;
using System.ComponentModel.DataAnnotations;

namespace Hospitalzinho.DTO.Post
{
    public class PacientePostDto : EntidadeBase
    {
        [Required]
        public string Nome { get; set; }
        [Required]
        public string CNS { get; set; }
        [Required]
        public string Cpf { get; set; }
        public DateTime DataNascimento { get; set; }
        public string? NomePai { get; set; }
        public string? NomeMae { get; set; }
        public string? CpfPai { get; set; }
        public string? CpfMae { get; set; }
        public bool Ativo { get; set; } = true;
        public SexoPaciente? Sexo { get; set; }
        public string? Nacionalidade { get; set; }
        public RacaPaciente? Raca { get; set; }
        public string? Naturalidade { get; set; }
        public EscolaridadePaciente? Escolaridade { get; set; }

        // Contato
        public string? TelefoneResidencial { get; set; }
        public string? TelefoneCelular { get; set; }
        public string? Email { get; set; }

        // Endereço
        [Required] 
        public string Logradouro { get; set; }
        public string Numero { get; set; }
        public string? Complemento { get; set; }
        public string Bairro { get; set; }
        [Required] 
        public string Cidade { get; set; }
        [Required] 
        public string Estado { get; set; }
        public string? Cep { get; set; }

        // Prontuário
        [Required]
        public TipoSanguineo TipoSanguineo { get; set; }
    }
}
