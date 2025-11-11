using Hospitalzinho.Enum;
using FGB.Entidades;
using System.Text.Json.Serialization;
using FGB.Dominio.Atributos;

namespace Hospitalzinho.Entidades
{
    public class HospitalUnidade : EntidadeBase
    {
        [Obrigar]
        public virtual string Nome { get; set; }
        [Obrigar]
        public virtual string CNES { get; set; } // Código Nacional de Estabelecimentos de Saúde

        [Obrigar]
        public virtual TipoUnidade TipoUnidade { get; set; }
        [JsonIgnore]
        public virtual Hospital InstituicaoPai { get; set; }
        [Obrigar]
        public virtual long InstituicaoPaiId { get; set; }
        [Obrigar]
        public virtual long EnderecoId { get; set; }
        [JsonIgnore]
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
