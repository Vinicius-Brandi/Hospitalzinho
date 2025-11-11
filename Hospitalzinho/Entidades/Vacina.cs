using System.Text.Json.Serialization;
using FGB.Dominio.Atributos;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class Vacina : EntidadeBase
    {
        public virtual string? Lote { get; set; } // Lote da vacina
        public virtual DateTime? DataProducao { get; set; }
        public virtual DateTime? DataValidade { get; set; }
        public virtual int QuantidadeDisponivel { get; set; } // Quantidade disponível no estoque
        [Obrigar]
        public virtual long VacinaModeloId { get; set; }
        [JsonIgnore]
        public virtual VacinaModelo VacinaModelo { get; set; } // Referência ao modelo
        [Obrigar]
        public virtual long HospitalId { get; set; }
        [JsonIgnore]
        public virtual HospitalUnidade Hospital { get; set; }
    }
}
