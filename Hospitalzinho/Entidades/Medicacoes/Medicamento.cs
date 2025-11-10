using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class Medicamento : EntidadeBase
    {
        [Required]
        public virtual long ModeloId { get; set; }
        [JsonIgnore]
        public virtual MedicamentoModelo Modelo { get; set; }
        public virtual string? Lote { get; set; }
        public virtual DateTime? DataFabricacao { get; set; }
        public virtual DateTime? DataValidade { get; set; }
        public virtual int QuantidadeDisponivel { get; set; } // Quantidade em estoque
        public virtual long? HospitalId { get; set; }
        [JsonIgnore]
        public virtual HospitalUnidade Hospital { get; set; }
    }
}
