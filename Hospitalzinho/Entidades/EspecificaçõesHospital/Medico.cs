using FGB.Dominio.Atributos;
using FGB.Entidades;
using System.Text.Json.Serialization;

namespace Hospitalzinho.Entidades
{
    public class ProfissionalSaude : EntidadeBase
    {
        [Obrigar]
        public virtual string Nome { get; set; } = null!;

        [Obrigar]
        public virtual string RegistroProfissional { get; set; } // CRM, COREN etc.

        // FK
        [Obrigar(typeof(Especialidade))]
        public virtual long EspecialidadeId { get; set; }
        [JsonIgnore]
        public virtual Especialidade Especialidade { get; set; } = null!;
        [Obrigar(typeof(HospitalUnidade))]
        public virtual long HospitalId { get; set; }
        [JsonIgnore]
        public virtual HospitalUnidade Hospital { get; set; } = null!;


        // Relacionamentos
        [JsonIgnore]
        public virtual IList<PacienteConsulta> Consultas { get; set; } = new List<PacienteConsulta>();
        [JsonIgnore]
        public virtual IList<PacienteExame> ExamesSolicitados { get; set; } = new List<PacienteExame>();
        [JsonIgnore]
        public virtual IList<PacienteInternacao> Internacoes { get; set; } = new List<PacienteInternacao>();
        [JsonIgnore]
        public virtual IList<PacienteVacinacao> VacinacoesAdministradas { get; set; } = new List<PacienteVacinacao>();
        [JsonIgnore]
        public virtual IList<PacienteCirurgia> Cirurgias { get; set; } = new List<PacienteCirurgia>();
        [JsonIgnore]
        public virtual IList<Receita> ReceitasPrescritas { get; set; } = new List<Receita>();

    }

}
