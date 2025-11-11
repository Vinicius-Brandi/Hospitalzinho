using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class PacienteCirurgia : EntidadeBase
    {
        [Required]
        public virtual long ProntuarioId { get; set; }
        [JsonIgnore]
        public virtual PacienteProntuario Prontuario { get; set; }
        public virtual string Nome { get; set; } // Ex: "Apendicectomia"
        public virtual DateTime DataCirurgia { get; set; }
        [Required]
        public virtual long ProfResponsavelId { get; set; }
        [JsonIgnore]
        public virtual ProfissionalSaude ProfResponsavel { get; set; }
        [Required]
        public virtual long SalaId { get; set; }
        [JsonIgnore]
        public virtual Sala Sala { get; set; }
        [Required]
        public virtual long HospitalId { get; set; }
        [JsonIgnore]
        public virtual HospitalUnidade Hospital { get; set; }
        public virtual string? Observacoes { get; set; }
    }
}
