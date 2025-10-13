using System.ComponentModel.DataAnnotations;

using FGB.Entidades;
namespace Hospitalzinho.Entidades
{
    public class Sala : EntidadeBase
    {
        public virtual string Numero { get; set; } // Ex: "Consultório 12", "Sala 305"
        [Required]
        public virtual Ala Ala { get; set; } // Ala/setor da sala
        public virtual TipoSala Tipo { get; set; } // Ex: "Consultório", "Sala de Exames", "Sala de Procedimentos"

        public virtual IList<PacienteConsulta> Consultas { get; set; } = new List<PacienteConsulta>();
    }
}
