using FGB.Dominio.Atributos;
using FGB.Entidades;
using System.Text.Json.Serialization;

namespace Hospitalzinho.Entidades
{
    public class Exame : EntidadeBase
    {
        [Obrigar, Unico]
        public virtual string Nome { get; set; } // Ex: "Sangue", "Raio-X", "Tomografia"
        public virtual string? Descricao { get; set; } // Explicação do exame, quando é indicado
        [JsonIgnore]
        public virtual IList<PacienteExame> Exames { get; set; } = new List<PacienteExame>();
    }
}
