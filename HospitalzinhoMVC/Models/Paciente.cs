using System.ComponentModel.DataAnnotations;

namespace HospitalzinhoMVC.Models
{
    public class Paciente
    {
        [Required]
        public virtual string Nome { get; set; }
        [Required]
        public virtual string CNS { get; set; }
        public string Cpf { get; set; }
        public DateTime DataNascimento { get; set; }
        public string NomePai { get; set; }
        public string NomeMae { get; set; }
        public string CpfPai { get; set; }
        public string CpfMae { get; set; }
        public bool Ativo { get; set; } = true;
        public SexoPaciente Sexo { get; set; }
        public string Nacionalidade { get; set; }
        public RacaPaciente Raca { get; set; }
        public string Naturalidade { get; set; }
        public EscolaridadePaciente Escolaridade { get; set; }
        public PacienteContato Contato { get; set; }
        public PacienteEndereco Endereco { get; set; }
    }
}
