using System.ComponentModel.DataAnnotations;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class ItemReceita : EntidadeBase
    {
        public virtual int Quantidade { get; set; }
        public virtual string Posologia { get; set; } // Ex: "1 comprimido a cada 12h"

        // FK - Receita
        [Required]
        public virtual Receita Receita { get; set; }

        // FK - MedicamentoModelo (não lote específico)
        public virtual MedicamentoModelo Modelo { get; set; }
    }
}
