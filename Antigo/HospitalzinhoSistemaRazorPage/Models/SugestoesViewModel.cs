using HospitalzinhoSistema.Models.Paciente;

namespace HospitalzinhoSistema.Models
{
    public class SugestoesViewModel
    {
        public List<PacienteDTO> Sugestoes { get; set; } = new List<PacienteDTO>();
        public string PageName { get; set; }
        public string PageHandler { get; set; }
    }
}
