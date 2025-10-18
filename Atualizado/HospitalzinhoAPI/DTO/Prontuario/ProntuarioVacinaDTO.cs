using HospitalzinhoAPI.Models.Hospital.Paciente;
using System.Text.Json.Serialization;

namespace HospitalzinhoAPI.DTO.Hospital.Prontuario
{
    public class ProntuarioVacinaDTO
    {
        public string Nome { get; set; }
        public string Dose { get; set; }
        public DateTime DataAplicacao { get; set; }
    }
}
