using FGB.Entidades;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace Hospitalzinho.Entidades
{
    public class PacienteAlergia : EntidadeBase
    {
        [Required]
        public virtual long ProntuarioId { get; set; }
        [JsonIgnore]
        public virtual PacienteProntuario Prontuario { get; set; }

        [Required]
        public virtual long AlergiaId { get; set; }
        [JsonIgnore]
        public virtual Alergia Alergia { get; set; }

        public virtual string? Observacao { get; set; }
    }
}
