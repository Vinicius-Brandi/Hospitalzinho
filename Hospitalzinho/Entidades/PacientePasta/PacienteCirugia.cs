using System.ComponentModel.DataAnnotations;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class PacienteCirurgia : EntidadeBase
    {
        [Required]
        public virtual PacienteProntuario Prontuario { get; set; }
        public virtual string Nome { get; set; } // Ex: "Apendicectomia"
        public virtual DateTime DataCirurgia { get; set; }
        [Required]
        public virtual ProfissionalSaude ProfResponsavel { get; set; }
        [Required]
        public virtual Sala Sala { get; set; }
        [Required]
        public virtual HospitalUnidade Hospital { get; set; }
        public virtual string? Observacoes { get; set; }
    }
}
