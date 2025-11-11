using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class ItemReceita : EntidadeBase
    {
        public virtual int Quantidade { get; set; }
        public virtual string? Posologia { get; set; } // Ex: "1 comprimido a cada 12h"

        // FK - Receita
        [Required]
        public virtual long ReceitaId { get; set; }
        [JsonIgnore]
        public virtual Receita? Receita { get; set; }

        // FK - MedicamentoModelo (não lote específico)
        [Required]
        public virtual long ModeloId { get; set; }
        [JsonIgnore]
        public virtual MedicamentoModelo? Modelo { get; set; }
    }
}
