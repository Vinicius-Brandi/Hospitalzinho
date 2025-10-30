using FGB.Entidades;
using System.ComponentModel.DataAnnotations;

namespace Hospitalzinho.Entidades
{
    public class Alergia : EntidadeBase
    {
        [Required]
        public virtual string Nome { get; set; }
        [Required]
        public virtual TipoAlergia Tipo { get; set; }
    }
}