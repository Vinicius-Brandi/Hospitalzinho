using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class Especialidade : EntidadeBase
    {
        [Required]
        public virtual string Nome { get; set; }
        [JsonIgnore]
        public virtual  IList<ProfissionalSaude> Profissionais { get; set; } = new List<ProfissionalSaude>();
    }
}
