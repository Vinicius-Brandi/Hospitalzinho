using System.ComponentModel.DataAnnotations;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class PacienteConsulta : EntidadeBase
    {
        [Required]
        public virtual PacienteProntuario Prontuario { get; set; }
        public virtual DateTime DataConsulta { get; set; }
        [Required]
        public virtual ProfissionalSaude ProfResponsavel { get; set; }
        public virtual string? Observacoes { get; set; }
        [Required]
        public virtual Sala Sala { get; set; }
        public virtual IList<PacienteExame> Exames { get; set; } = new List<PacienteExame>();
        public virtual HospitalUnidade Hospital { get; set; }
    }
}
