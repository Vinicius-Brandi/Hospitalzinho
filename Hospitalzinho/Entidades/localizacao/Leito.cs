using FGB.Entidades;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Hospitalzinho.Entidades
{
    public class Leito : EntidadeBase
    {
        [Required]
        public virtual string Numero { get; set; } // Ex: "101A", "202B"
        public virtual bool Ocupado { get; set; } = false;
        [Required]
        public virtual long QuartoId { get; set; }
        [JsonIgnore]
        public virtual Quarto Quarto { get; set; }
        [JsonIgnore]
        public virtual IList<PacienteInternacao> Internacoes { get; set; } = new List<PacienteInternacao>();
    }
}
