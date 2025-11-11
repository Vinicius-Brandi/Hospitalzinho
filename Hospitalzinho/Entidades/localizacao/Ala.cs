using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FGB.Entidades;
namespace Hospitalzinho.Entidades
{
    public class Ala : EntidadeBase
    {
        [Required]
        public virtual string Nome { get; set; } // Ex: "Ala Norte", "Ala Pediatria"
        [JsonIgnore]
        public virtual IList<Quarto> Quartos { get; set; } = new List<Quarto>();
        [JsonIgnore]
        public virtual IList<Sala> Salas { get; set; } = new List<Sala>();
        [Required]
        public virtual long HospitalId { get; set; }
        [JsonIgnore]
        public virtual HospitalUnidade Hospital { get; set; }
    }
}
