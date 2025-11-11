using System.Text.Json.Serialization;
using FGB.Dominio.Atributos;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class PacienteConsulta : EntidadeBase
    {
        [Obrigar]
        public virtual long ProntuarioId { get; set; }
        [JsonIgnore]
        public virtual PacienteProntuario Prontuario { get; set; }
        public virtual DateTime DataConsulta { get; set; }
        [Obrigar]
        public virtual long ProfResponsavelId { get; set; }
        public virtual ProfissionalSaude ProfResponsavel { get; set; }
        public virtual string? Observacoes { get; set; }
        [Obrigar]
        public virtual long SalaId { get; set; }
        public virtual Sala Sala { get; set; }
        [JsonIgnore]
        public virtual IList<PacienteExame> Exames { get; set; } = new List<PacienteExame>();
        [Obrigar]
        public virtual long HospitalId { get; set; }
        [JsonIgnore]
        public virtual HospitalUnidade Hospital { get; set; }
    }
}
