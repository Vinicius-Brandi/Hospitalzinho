using System.Text.Json.Serialization;
using FGB.Dominio.Atributos;
using FGB.Entidades;
namespace Hospitalzinho.Entidades
{
    public class Quarto : EntidadeBase
    {
        [Obrigar]
        public virtual string Numero { get; set; } // Ex: "101A"
        [Obrigar(typeof(Ala))]
        public virtual long AlaId { get; set; }
        [JsonIgnore]
        public virtual Ala Ala { get; set; } // Ala onde o quarto está localizado
        [Obrigar]
        public virtual TipoQuarto Tipo { get; set; } // Enum: Enfermaria, UTI, Isolamento
        [Obrigar]
        public virtual int Capacidade { get; set; } // Quantas camas
        [Obrigar(typeof(HospitalUnidade))]
        public virtual long HospitalId { get; set; }
        [JsonIgnore]
        public virtual IList<PacienteInternacao> Internacoes { get; set; } = new List<PacienteInternacao>();
        [JsonIgnore]
        public virtual IList<Leito> Leitos { get; set; } = new List<Leito>();
    }
}
