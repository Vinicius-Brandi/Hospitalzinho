using HospitalzinhoAPI.Models.Hospital.Paciente;

namespace HospitalzinhoAPI.Models.Hospital.Prontuario
{
    public class ProntuarioVacina
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Dose { get; set; }
        public DateTime DataAplicacao { get; set; }
        public PacienteModel Paciente { get; set; }
    }
}
