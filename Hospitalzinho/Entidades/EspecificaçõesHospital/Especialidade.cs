using System.Text.Json.Serialization;
using FGB.Dominio.Atributos;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class Especialidade : EntidadeBase
    {
        [Obrigar]
        public virtual string Nome { get; set; }
        [JsonIgnore]
        public virtual  IList<ProfissionalSaude> Profissionais { get; set; } = new List<ProfissionalSaude>();
    }
}
