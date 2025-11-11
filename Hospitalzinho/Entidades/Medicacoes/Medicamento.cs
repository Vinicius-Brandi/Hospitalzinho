using System.Text.Json.Serialization;
using FGB.Dominio.Atributos;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class Medicamento : EntidadeBase
    {
        [Obrigar]
        public virtual long ModeloId { get; set; }
        [JsonIgnore]
        public virtual MedicamentoModelo Modelo { get; set; }
        public virtual string? Lote { get; set; }
        public virtual DateTime? DataFabricacao { get; set; }
        public virtual DateTime? DataValidade { get; set; }
        [Obrigar]
        public virtual int QuantidadeDisponivel { get; set; } // Quantidade em estoque
        [Obrigar]
        public virtual long? HospitalId { get; set; }
        [JsonIgnore]
        public virtual HospitalUnidade Hospital { get; set; }
    }
}
