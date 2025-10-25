using System.ComponentModel.DataAnnotations;

namespace HospitalzinhoMVC.Models.BrandiAPI
{
    public class PacienteContato
    {
        [Required]
        public virtual Paciente Paciente { get; set; }
        public virtual string TelefoneResidencial { get; set; }
        public virtual string TelefoneCelular { get; set; }
        public virtual string Email { get; set; }
    }
}