using System.ComponentModel.DataAnnotations;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class PacienteProntuario : EntidadeBase
    {
        [Required]
        public virtual Paciente Paciente { get; set; }
        [Required]
        public virtual TipoSanguineo TipoSangue { get; set; }
        public virtual IList<PacienteAlergia> Alergias { get; set; } = new List<PacienteAlergia>();
        public virtual IList<PacienteDoencaCronica> DoencasCronicas { get; set; } = new List<PacienteDoencaCronica>();
        public virtual IList<PacienteMedicacao> MedicacoesContinuas { get; set; } = new List<PacienteMedicacao>();
        public virtual IList<PacienteCirurgia> Cirurgias { get; set; } = new List<PacienteCirurgia>();
        public virtual IList<PacienteVacinacao> Vacinacoes { get; set; } = new List<PacienteVacinacao>();
        public virtual IList<PacienteConsulta> Consultas { get; set; } = new List<PacienteConsulta>();
        public virtual IList<PacienteInternacao> Internacoes { get; set; } = new List<PacienteInternacao>();
        public virtual IList<PacienteExame> Exames { get; set; } = new List<PacienteExame>();
    }
}
