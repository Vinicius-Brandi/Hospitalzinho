using System.ComponentModel.DataAnnotations;

namespace HospitalzinhoMVC.Models
{
    public class PacienteEndereco
    {
        [Required]
        public virtual Paciente Paciente { get; set; }
        public virtual string Logradouro { get; set; }
        public virtual string Numero { get; set; }
        public virtual string Complemento { get; set; }
        public virtual string Bairro { get; set; }
        public virtual string Cidade { get; set; }
        public virtual string Estado { get; set; }
        public virtual string Cep { get; set; }
    }
}
