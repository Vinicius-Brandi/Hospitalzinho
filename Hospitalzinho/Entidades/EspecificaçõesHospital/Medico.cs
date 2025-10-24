using FGB.Entidades;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Hospitalzinho.Entidades
{
    public class ProfissionalSaude : EntidadeBase
    {
        public virtual string Nome { get; set; } = null!;

        [Required]
        public virtual string? RegistroProfissional { get; set; } // CRM, COREN etc.

        // FK
        [Required]
        public virtual Especialidade Especialidade { get; set; } = null!;

        // Relacionamentos
        public virtual IList<PacienteConsulta> Consultas { get; set; } = new List<PacienteConsulta>();
        public virtual IList<PacienteExame> ExamesSolicitados { get; set; } = new List<PacienteExame>();
        public virtual IList<PacienteInternacao> Internacoes { get; set; } = new List<PacienteInternacao>();
        public virtual IList<PacienteVacinacao> VacinacoesAdministradas { get; set; } = new List<PacienteVacinacao>();
        public virtual IList<Receita> ReceitasPrescritas { get; set; } = new List<Receita>();

        [Required]
        public virtual HospitalUnidade Hospital { get; set; } = null!;
    }

}
