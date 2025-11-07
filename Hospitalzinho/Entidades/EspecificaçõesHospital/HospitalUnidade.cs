using Hospitalzinho.Enum;
using System.ComponentModel.DataAnnotations;
using FGB.Entidades;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hospitalzinho.Entidades
{
    public class HospitalUnidade : EntidadeBase
    {
        [Required]
        public virtual string Nome { get; set; }
        [Required]
        public virtual string CNES { get; set; } // Código Nacional de Estabelecimentos de Saúde

        [Required]
        public virtual TipoUnidade TipoUnidade { get; set; }
        [JsonIgnore]
        public virtual Hospital InstituicaoPai { get; set; }
        [Required]
        public virtual long InstituicaoPaiId { get; set; }
        public virtual HospitalEndereco Endereco { get; set; }

        //LISTAS 
        [JsonIgnore]
        public virtual IList<Ala> Alas { get; set; } = new List<Ala>();
        [JsonIgnore]
        public virtual IList<ProfissionalSaude> ProfissionaisSaude { get; set; } = new List<ProfissionalSaude>();
        [JsonIgnore]
        public virtual IList<Convenio> Convenios { get; set; } = new List<Convenio>();
        [JsonIgnore]
        public virtual IList<PacienteCirurgia> PacientesCirurgia { get; set; } = new List<PacienteCirurgia>();
        [JsonIgnore]
        public virtual IList<PacienteExame> PacienteExames { get; set; } = new List<PacienteExame>();
        [JsonIgnore]
        public virtual IList<PacienteInternacao> PacientesInternacao { get; set; } = new List<PacienteInternacao>();
        [JsonIgnore]
        public virtual IList<PacienteConsulta> PacientesConsulta { get; set; } = new List<PacienteConsulta>();
        [JsonIgnore]
        public virtual IList<PacienteVacinacao> PacientesVacinacao { get; set; } = new List<PacienteVacinacao>();
        [JsonIgnore]
        public virtual IList<Receita> Receitas { get; set; } = new List<Receita>();

    }
}
