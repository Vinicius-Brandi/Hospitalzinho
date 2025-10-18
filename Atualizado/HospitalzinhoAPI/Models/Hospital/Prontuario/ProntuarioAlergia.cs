using HospitalzinhoAPI.Models.Hospital.Paciente;
using System.Text.Json.Serialization;

namespace HospitalzinhoAPI.Models.Hospital.Prontuario
{
    public class ProntuarioAlergia
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string DescricaoAlergia { get; set; }
        [JsonIgnore]
        public PacienteModel? Paciente { get; set; }
    }
}
