using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class PacienteConsulta : EntidadeBase
    {
        [Required]
        public virtual long ProntuarioId { get; set; }
        [JsonIgnore]
        public virtual PacienteProntuario Prontuario { get; set; }
        public virtual DateTime DataConsulta { get; set; }
        [Required]
        public virtual long ProfResponsavelId { get; set; }
        public virtual ProfissionalSaude ProfResponsavel { get; set; }
        public virtual string? Observacoes { get; set; }
        [Required]
        public virtual long SalaId { get; set; }
        public virtual Sala Sala { get; set; }
        [JsonIgnore]
        public virtual IList<PacienteExame> Exames { get; set; } = new List<PacienteExame>();
        [Required]
        public virtual long HospitalId { get; set; }
        [JsonIgnore]
        public virtual HospitalUnidade Hospital { get; set; }
    }
}
