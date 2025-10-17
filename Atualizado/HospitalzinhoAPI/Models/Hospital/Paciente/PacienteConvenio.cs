using System.ComponentModel.DataAnnotations;

namespace HospitalzinhoAPI.Models.Hospital.Paciente
{
    public class PacienteConvenio
    {
        [Key]
        public int PacienteId { get; set; }
        public PacienteModel Paciente { get; set; }
        public string NumeroCarteirinha { get; set; }
        public DateTime Validade { get; set; }
    }
}
