using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class PacienteExame : EntidadeBase
    {
        public virtual DateTime DataExame { get; set; }
        [Required]
        public virtual long TipoExameId { get; set; }
        [JsonIgnore]
        public virtual Exame TipoExame { get; set; } // Ex: "Sangue", "Raio-X"
        public virtual string? Laboratorio { get; set; }
        public virtual string? Resultados { get; set; }
        public virtual string? Observacoes { get; set; }
        [Required]
        public virtual long ProntuarioId { get; set; }
        [JsonIgnore]
        public virtual PacienteProntuario Prontuario { get; set; }

        [Required]
        public virtual long ProfResponsavelId { get; set; }
        [JsonIgnore]
        public virtual ProfissionalSaude ProfResponsavel { get; set; }
        [Required]
        public virtual long HospitalId { get; set; }
        [JsonIgnore]
        public virtual HospitalUnidade Hospital { get; set; }
    }
}
