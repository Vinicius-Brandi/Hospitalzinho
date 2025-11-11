using FGB.Dominio.Atributos;
using FGB.Entidades;
using System.Text.Json.Serialization;

namespace Hospitalzinho.Entidades
{
    public class PacienteAlergia : EntidadeBase
    {
        [Obrigar]
        public virtual long ProntuarioId { get; set; }
        [JsonIgnore]
        public virtual PacienteProntuario Prontuario { get; set; }

        [Obrigar]
        public virtual long AlergiaId { get; set; }
        [JsonIgnore]
        public virtual Alergia Alergia { get; set; }

        public virtual string? Observacao { get; set; }
    }
}
