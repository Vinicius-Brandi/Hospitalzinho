using HospitalzinhoAPI.Models.Hospital.Paciente;

namespace HospitalzinhoAPI.Models.Hospital.Prontuario
{
    public class ProntuarioAlergia
    {
        public int Id { get; set; }
        public string DescricaoAlergia { get; set; }
        public PacienteModel Paciente { get; set; }
    }
}
