using System.Text.Json.Serialization;
using FGB.Dominio.Atributos;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class PacienteDoencaCronica : EntidadeBase
    {
        [Obrigar(typeof(PacienteProntuario))]
        public virtual long ProntuarioId { get; set; }
        [JsonIgnore]
        public virtual PacienteProntuario Prontuario { get; set; }
        [Obrigar(typeof(DoencaCronicaModelo))]
        public virtual long ModeloId { get; set; }
        [JsonIgnore]
        public virtual DoencaCronicaModelo Modelo { get; set; }
        public virtual DateTime? DataDiagnostico { get; set; }
        [Obrigar]
        public virtual string Estagio { get; set; } // Ex: "Leve", "Moderada", "Avançada"
        public virtual string? Observacoes { get; set; }
        public virtual bool EmTratamento { get; set; } = true;
    }
}