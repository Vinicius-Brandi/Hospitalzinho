using System.Text.Json.Serialization;
using FGB.Dominio.Atributos;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class PacienteProntuario : EntidadeBase
    {
        [Obrigar]
        public virtual Paciente Paciente { get; set; }
        [Obrigar]
        public virtual TipoSanguineo TipoSangue { get; set; }
        [JsonIgnore]
        public virtual IList<PacienteAlergia> Alergias { get; set; } = new List<PacienteAlergia>();
        [JsonIgnore]
        public virtual IList<PacienteDoencaCronica> DoencasCronicas { get; set; } = new List<PacienteDoencaCronica>();
        [JsonIgnore]
        public virtual IList<PacienteMedicacao> MedicacoesContinuas { get; set; } = new List<PacienteMedicacao>();
        [JsonIgnore]
        public virtual IList<PacienteCirurgia> Cirurgias { get; set; } = new List<PacienteCirurgia>();
        [JsonIgnore]
        public virtual IList<PacienteVacinacao> Vacinacoes { get; set; } = new List<PacienteVacinacao>();
        [JsonIgnore]
        public virtual IList<PacienteConsulta> Consultas { get; set; } = new List<PacienteConsulta>();
        [JsonIgnore]
        public virtual IList<PacienteInternacao> Internacoes { get; set; } = new List<PacienteInternacao>();
        [JsonIgnore]
        public virtual IList<PacienteExame> Exames { get; set; } = new List<PacienteExame>();
    }
}
