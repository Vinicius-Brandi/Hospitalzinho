using System.Text.Json.Serialization;
using FGB.Dominio.Atributos;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class ItemReceita : EntidadeBase
    {
        public virtual int Quantidade { get; set; }
        public virtual string? Posologia { get; set; } // Ex: "1 comprimido a cada 12h"

        // FK - Receita
        [Obrigar]
        public virtual long ReceitaId { get; set; }
        [JsonIgnore]
        public virtual Receita? Receita { get; set; }

        // FK - MedicamentoModelo (não lote específico)
        [Obrigar]
        public virtual long ModeloId { get; set; }
        [JsonIgnore]
        public virtual MedicamentoModelo? Modelo { get; set; }
    }
}
