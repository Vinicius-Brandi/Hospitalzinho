using System.ComponentModel.DataAnnotations;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class PacienteInternacao : EntidadeBase
    {
        [Required]
        public virtual PacienteProntuario Prontuario { get; set; }
        public virtual DateTime DataInternacao { get; set; }
        public virtual DateTime? DataAlta { get; set; } // Pode ser nulo enquanto o paciente estiver internado
        [Required]
        public virtual Quarto Quarto { get; set; } // Ex: "101A"
        public virtual string Motivo { get; set; }
        [Required]
        public virtual ProfissionalSaude ProfResponsavel { get; set; }
        public virtual string Observacoes { get; set; }
        [Required]
        public virtual HospitalUnidade Hospital { get; set; }
    }
}
