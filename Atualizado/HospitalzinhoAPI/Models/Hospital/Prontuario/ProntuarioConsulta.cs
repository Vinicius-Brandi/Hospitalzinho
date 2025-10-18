using HospitalzinhoAPI.Models.Hospital.Paciente;

namespace HospitalzinhoAPI.Models.Hospital.Prontuario
{
    public class ProntuarioConsulta
    {
        public int Id { get; set; }
        public DateTime DataConsulta { get; set; }
        public string Especialidade { get; set; }
        public string Resumo { get; set; }
        public PacienteModel Paciente { get; set; }
    }
}
