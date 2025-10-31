using System.ComponentModel.DataAnnotations;

using FGB.Entidades;
namespace Hospitalzinho.Entidades
{
    public class Quarto : EntidadeBase
    {
        [Required]
        public virtual string Numero { get; set; } // Ex: "101A"
        [Required]
        public virtual Ala Ala { get; set; } // Ala onde o quarto está localizado
        [Required]
        public virtual TipoQuarto Tipo { get; set; } // Enum: Enfermaria, UTI, Isolamento
        [Required]
        public virtual int Capacidade { get; set; } // Quantas camas
        public virtual IList<PacienteInternacao> Internacoes { get; set; } = new List<PacienteInternacao>();
    }
}
