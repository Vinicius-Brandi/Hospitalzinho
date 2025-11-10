using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class VacinaModelo : EntidadeBase
    {
        [Required]
        public virtual string Nome { get; set; } // Nome da vacina, ex: "Covid-19 Pfizer"
        public virtual string Fabricante { get; set; } // Ex: "Pfizer"
        public virtual string Tipo { get; set; } // Ex: "RNA mensageiro", "Inativada"
        public virtual string Indicacao { get; set; } // Quem deve tomar
        public virtual int? NumeroDoses { get; set; } // Total de doses previstas
        public virtual long IntervaloEntreDoses { get; set; } // Intervalo sugerido entre doses
        [JsonIgnore]
        public virtual IList<Vacina> Vacinas { get; set; } = new List<Vacina>(); // Vacinas físicas produzidas a partir desse modelo
    }
}
