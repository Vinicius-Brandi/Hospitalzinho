using FGB.Entidades;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Hospitalzinho.Entidades
{
    public class PacienteInternacao : EntidadeBase
    {
        [Required]
        public virtual long ProntuarioId { get; set; }
        [JsonIgnore]
        public virtual PacienteProntuario Prontuario { get; set; }
        public virtual DateTime DataInternacao { get; set; }
        public virtual DateTime? DataAlta { get; set; } // Pode ser nulo enquanto o paciente estiver internado
        [Required]
        public virtual long QuartoId { get; set; }
        [JsonIgnore]
        public virtual Quarto Quarto { get; set; } // Ex: "101A"
        public virtual string? Motivo { get; set; }
        [Required]
        public virtual long ProfResponsavelId { get; set; }
        [JsonIgnore]
        public virtual ProfissionalSaude ProfResponsavel { get; set; }
        public virtual string? Observacoes { get; set; }
        [Required]
        public virtual long HospitalId { get; set; }
        [JsonIgnore]
        public virtual HospitalUnidade Hospital { get; set; }
    }
}
