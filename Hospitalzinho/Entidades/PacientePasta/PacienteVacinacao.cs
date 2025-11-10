using FGB.Entidades;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Hospitalzinho.Entidades
{
    public class PacienteVacinacao : EntidadeBase
    {
        [Required]
        public virtual long ProntuarioId { get; set; }
        [JsonIgnore]
        public virtual PacienteProntuario Prontuario { get; set; }
        [Required]
        public virtual long VacinaId { get; set; }
        [JsonIgnore]
        public virtual Vacina Vacina { get; set; }

        [Required]
        public virtual long ProfResponsavelId { get; set; }
        [JsonIgnore]
        public virtual ProfissionalSaude ProfResponsavel { get; set; }

        public virtual DateTime DataAplicacao { get; set; }
        public virtual int DoseNumero { get; set; }
        public virtual string? Observacoes { get; set; }

        [Required]
        public virtual long HospitalId { get; set; }
        [JsonIgnore]
        public virtual HospitalUnidade Hospital { get; set; }

    }
}
