using FGB.Dominio.Atributos;
using FGB.Entidades;
using System.Text.Json.Serialization;

namespace Hospitalzinho.Entidades
{
    public class PacienteInternacao : EntidadeBase
    {
        [Obrigar]
        public virtual long ProntuarioId { get; set; }
        [JsonIgnore]
        public virtual PacienteProntuario Prontuario { get; set; }
        public virtual DateTime DataInternacao { get; set; }
        public virtual DateTime? DataAlta { get; set; } // Pode ser nulo enquanto o paciente estiver internado
        [Obrigar]
        public virtual long QuartoId { get; set; }
        [JsonIgnore]
        public virtual Quarto Quarto { get; set; }
        [Obrigar]
        public virtual long LeitoId { get; set; }
        [JsonIgnore]
        public virtual Leito Leito { get; set; }
        public virtual string? Motivo { get; set; }
        [Obrigar]
        public virtual long ProfResponsavelId { get; set; }
        [JsonIgnore]
        public virtual ProfissionalSaude ProfResponsavel { get; set; }
        public virtual string? Observacoes { get; set; }
        [Obrigar]
        public virtual long HospitalId { get; set; }
        [JsonIgnore]
        public virtual HospitalUnidade Hospital { get; set; }
    }
}
