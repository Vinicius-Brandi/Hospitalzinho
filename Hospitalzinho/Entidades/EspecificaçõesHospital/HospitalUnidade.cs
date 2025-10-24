using Hospitalzinho.Enum;
using System.ComponentModel.DataAnnotations;
using FGB.Entidades;
using System.Collections.Generic;

namespace Hospitalzinho.Entidades
{
    public class HospitalUnidade : EntidadeBase
    {
        [Required]
        public virtual string Nome { get; set; }

        [Required]
        public virtual TipoUnidade TipoUnidade { get; set; }
        public virtual HospitalEndereco Endereco { get; set; }
        public virtual IList<Ala> Alas { get; set; } = new List<Ala>();
        public virtual IList<ProfissionalSaude> ProfissionaisSaude { get; set; } = new List<ProfissionalSaude>();
        public virtual IList<Convenio> Convenios { get; set; } = new List<Convenio>();
        public virtual IList<PacienteCirurgia> PacientesCirurgia { get; set; } = new List<PacienteCirurgia>();
        public virtual IList<PacienteExame> PacienteExames { get; set; } = new List<PacienteExame>();
        public virtual IList<PacienteInternacao> PacientesInternacao { get; set; } = new List<PacienteInternacao>();
        public virtual IList<PacienteConsulta> PacientesConsulta { get; set; } = new List<PacienteConsulta>();
        public virtual IList<PacienteVacinacao> PacientesVacinacao { get; set; } = new List<PacienteVacinacao>();
        public virtual IList<Receita> Receitas { get; set; } = new List<Receita>();

        [Required]
        public virtual Hospital InstituicaoPai { get; set; }
    }
}
