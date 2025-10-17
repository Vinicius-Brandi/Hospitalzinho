using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HospitalzinhoAPI.Models.Hospital.Paciente
{
    public class PacienteContato
    {
        [Key]
        public int PacienteId { get; set; }
        [JsonIgnore]
        public PacienteModel Paciente { get; set; }
        public string? TelefoneResidencial { get; set; }
        public string? TelefoneCelular { get; set; }
        public string? Email { get; set; }
    }
}
