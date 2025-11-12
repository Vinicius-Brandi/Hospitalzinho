using FGB.Dominio.Atributos;
using FGB.Entidades;
using System.Text.Json.Serialization;

namespace Hospitalzinho.Entidades
{
    public class PacienteVacinacao : EntidadeBase
    {
        [Obrigar(typeof(PacienteProntuario))]
        public virtual long ProntuarioId { get; set; }
        [JsonIgnore]
        public virtual PacienteProntuario Prontuario { get; set; }
        [Obrigar(typeof(Vacina))]
        public virtual long VacinaId { get; set; }
        [JsonIgnore]
        public virtual Vacina Vacina { get; set; }
        [Obrigar(typeof(ProfissionalSaude))]
        public virtual long ProfResponsavelId { get; set; }
        [JsonIgnore]
        public virtual ProfissionalSaude ProfResponsavel { get; set; }
        public virtual DateTime DataAplicacao { get; set; }
        public virtual int DoseNumero { get; set; }
        public virtual string? Observacoes { get; set; }
        [Obrigar(typeof(HospitalUnidade))]
        public virtual long HospitalId { get; set; }
        [JsonIgnore]
        public virtual HospitalUnidade Hospital { get; set; }
    }
}
