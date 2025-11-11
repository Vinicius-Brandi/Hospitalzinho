using System.Text.Json.Serialization;
using FGB.Dominio.Atributos;
using FGB.Entidades;
namespace Hospitalzinho.Entidades
{
    public class Ala : EntidadeBase
    {
        [Obrigar]
        public virtual string Nome { get; set; } // Ex: "Ala Norte", "Ala Pediatria"
        [JsonIgnore]
        public virtual IList<Quarto> Quartos { get; set; } = new List<Quarto>();
        [JsonIgnore]
        public virtual IList<Sala> Salas { get; set; } = new List<Sala>();
        [Obrigar]
        public virtual long HospitalId { get; set; }
        [JsonIgnore]
        public virtual HospitalUnidade Hospital { get; set; }
    }
}
