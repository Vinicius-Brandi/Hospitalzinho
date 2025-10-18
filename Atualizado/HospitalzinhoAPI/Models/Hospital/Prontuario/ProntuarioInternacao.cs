using HospitalzinhoAPI.Models.Hospital.Paciente;

namespace HospitalzinhoAPI.Models.Hospital.Prontuario
{
    public class ProntuarioInternacao
    {
        public int Id { get; set; }
        public DateTime DataEntrada { get; set; }
        public DateTime DataSaida { get; set; }
        public string MotivoInternacao { get; set; }
        public PacienteModel Paciente { get; set; }
    }
}
