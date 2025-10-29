using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class VacinaModelo : EntidadeBase
    {
        [Required]
        public virtual string Nome { get; set; } // Nome da vacina, ex: "Covid-19 Pfizer"
        public virtual long Fabricante { get; set; } // Ex: "Pfizer"
        public virtual long Tipo { get; set; } // Ex: "RNA mensageiro", "Inativada"
        public virtual long Indicacao { get; set; } // Quem deve tomar
        public virtual long NumeroDoses { get; set; } // Total de doses previstas
        public virtual TimeSpan IntervaloEntreDoses { get; set; } // Intervalo sugerido entre doses
        [JsonIgnore]
        public virtual List<Vacina> Vacinas { get; set; } = new List<Vacina>(); // Vacinas físicas produzidas a partir desse modelo
    }
}
