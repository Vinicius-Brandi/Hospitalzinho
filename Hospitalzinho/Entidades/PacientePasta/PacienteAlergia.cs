using FGB.Entidades;
using System.ComponentModel.DataAnnotations;


namespace Hospitalzinho.Entidades
{
    public class PacienteAlergia : EntidadeBase
    {
        [Required]
        public virtual PacienteProntuario Prontuario { get; set; }

        [Required]
        public virtual Alergia Alergia { get; set; }

        public virtual string? Observacao { get; set; }
    }
}
