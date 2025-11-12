using System.Text.Json.Serialization;
using FGB.Dominio.Atributos;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class PacienteCirurgia : EntidadeBase
    {
        [Obrigar(typeof(PacienteProntuario))]
        public virtual long ProntuarioId { get; set; }
        [JsonIgnore]
        public virtual PacienteProntuario Prontuario { get; set; }
        public virtual string Nome { get; set; } // Ex: "Apendicectomia"
        public virtual DateTime DataCirurgia { get; set; }
        [Obrigar(typeof(ProfissionalSaude))]
        public virtual long ProfResponsavelId { get; set; }
        [JsonIgnore]
        public virtual ProfissionalSaude ProfResponsavel { get; set; }
        [Obrigar(typeof(Sala))]
        public virtual long SalaId { get; set; }
        [JsonIgnore]
        public virtual Sala Sala { get; set; }
        [Obrigar(typeof(HospitalUnidade))]
        public virtual long HospitalId { get; set; }
        [JsonIgnore]
        public virtual HospitalUnidade Hospital { get; set; }
        public virtual string? Observacoes { get; set; }
    }
}
