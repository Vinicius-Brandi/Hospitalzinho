using FGB.Entidades;
using System.ComponentModel.DataAnnotations;

namespace Hospitalzinho.Entidades
{
    public class DoencaCronicaModelo : EntidadeBase
    {
        [Required]
        public virtual string Nome { get; set; } // Ex: "Hipertensão Arterial"
        [Required]
        public virtual string Cid { get; set; } // Código CID-10
        public virtual string? Descricao { get; set; }
    }
}
