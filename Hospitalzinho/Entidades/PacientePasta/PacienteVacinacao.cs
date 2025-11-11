using FGB.Dominio.Atributos;
using FGB.Entidades;
using System.Text.Json.Serialization;

namespace Hospitalzinho.Entidades
{
    public class PacienteVacinacao : EntidadeBase
    {
        [Obrigar]
        public virtual long ProntuarioId { get; set; }
        [JsonIgnore]
        public virtual PacienteProntuario Prontuario { get; set; }
        [Obrigar]
        public virtual long VacinaId { get; set; }
        [JsonIgnore]
        public virtual Vacina Vacina { get; set; }

        [Obrigar]
        public virtual long ProfResponsavelId { get; set; }
        [JsonIgnore]
        public virtual ProfissionalSaude ProfResponsavel { get; set; }

        public virtual DateTime DataAplicacao { get; set; }
        public virtual int DoseNumero { get; set; }
        public virtual string? Observacoes { get; set; }

        [Obrigar]
        public virtual long HospitalId { get; set; }
        [JsonIgnore]
        public virtual HospitalUnidade Hospital { get; set; }

    }
}
