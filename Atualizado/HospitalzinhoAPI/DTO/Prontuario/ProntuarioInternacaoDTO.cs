using HospitalzinhoAPI.Models.Hospital.Paciente;
using System.Text.Json.Serialization;

namespace HospitalzinhoAPI.DTO.Hospital.Prontuario
{
    public class ProntuarioInternacaoDTO
    {
        public DateTime DataEntrada { get; set; }
        public DateTime DataSaida { get; set; }
        public string MotivoInternacao { get; set; }
    }
}
