using FGB.Dominio.Atributos;
using FGB.Entidades;
using System.Text.Json.Serialization;

namespace Hospitalzinho.Entidades
{
    public class Leito : EntidadeBase
    {
        [Obrigar]
        public virtual string Numero { get; set; } // Ex: "101A", "202B"
        public virtual bool Ocupado { get; set; } = false;
        [Obrigar(typeof(Quarto))]
        public virtual long QuartoId { get; set; }
        [JsonIgnore]
        public virtual Quarto Quarto { get; set; }
        [Obrigar(typeof(Hospital))]
        public virtual long HospitalId { get; set; }
        [JsonIgnore]
        public virtual IList<PacienteInternacao> Internacoes { get; set; } = new List<PacienteInternacao>();
    }
}
