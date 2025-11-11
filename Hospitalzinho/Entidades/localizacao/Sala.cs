using System.Text.Json.Serialization;
using FGB.Dominio.Atributos;
using FGB.Entidades;
namespace Hospitalzinho.Entidades
{
    public class Sala : EntidadeBase
    {
        [Obrigar]
        public virtual string Numero { get; set; } // Ex: "Consultório 12", "Sala 305"
        [Obrigar]
        public virtual long AlaId { get; set; }
        [JsonIgnore]
        public virtual Ala Ala { get; set; } // Ala/setor da sala
        [Obrigar]
        public virtual TipoSala Tipo { get; set; } // Ex: "Consultório", "Sala de Exames", "Sala de Procedimentos"
        [JsonIgnore]

        public virtual IList<PacienteConsulta> Consultas { get; set; } = new List<PacienteConsulta>();
    }
}
