using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FGB.Entidades;
namespace Hospitalzinho.Entidades
{
    public class Quarto : EntidadeBase
    {
        [Required]
        public virtual string Numero { get; set; } // Ex: "101A"
        [Required]
        public virtual long AlaId { get; set; }
        [JsonIgnore]
        public virtual Ala Ala { get; set; } // Ala onde o quarto está localizado
        [Required]
        public virtual TipoQuarto Tipo { get; set; } // Enum: Enfermaria, UTI, Isolamento
        [Required]
        public virtual int Capacidade { get; set; } // Quantas camas
        [JsonIgnore]
        public virtual IList<PacienteInternacao> Internacoes { get; set; } = new List<PacienteInternacao>();
        [JsonIgnore]
        public virtual IList<Leito> Leitos { get; set; } = new List<Leito>();
    }
}
