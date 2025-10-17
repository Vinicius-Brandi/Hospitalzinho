using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HospitalzinhoAPI.Models.Hospital.Paciente
{
    public class PacienteEndereco
    {
        [Key]
        public int PacienteId { get; set; }
        [JsonIgnore]
        public PacienteModel Paciente { get; set; }
        public string? Logradouro { get; set; }
        public string? Numero { get; set; }
        public string? Complemento { get; set; }
        public string? Bairro { get; set; }
        public string? Cidade { get; set; }
        public string? Estado { get; set; }
        public string? CEP { get; set; }
    }
}
