using FGB.Entidades;
using System.ComponentModel.DataAnnotations;

namespace Hospitalzinho.Entidades
{
    public class Exame : EntidadeBase
    {
        [Required]
        public virtual string Nome { get; set; } // Ex: "Sangue", "Raio-X", "Tomografia"
        public virtual string Descricao { get; set; } // Explicação do exame, quando é indicado
        public virtual IList<PacienteExame> Exames { get; set; } = new List<PacienteExame>();
    }
}
