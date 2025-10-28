using System.ComponentModel.DataAnnotations;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class Especialidade : EntidadeBase
    {
        [Required]
        public virtual string Nome { get; set; } = null!;
        public virtual  IList<ProfissionalSaude> Profissionais { get; set; } = new List<ProfissionalSaude>();
    }
}
