using HospitalzinhoAPI.Models.Hospital.Paciente;
using System.Text.Json.Serialization;

namespace HospitalzinhoAPI.DTO.Hospital.Prontuario
{
    public class ProntuarioConsultaDTO
    {
        public DateTime DataConsulta { get; set; }
        public string Especialidade { get; set; }
        public string Resumo { get; set; }
    }
}
