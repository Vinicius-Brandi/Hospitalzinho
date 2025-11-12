using System.Text.Json.Serialization;
using FGB.Dominio.Atributos;
using FGB.Entidades;
namespace Hospitalzinho.Entidades
{
    public class Receita : EntidadeBase
    {
        public virtual DateTime Data { get; set; }

        // FK - Paciente e Profissional que prescreveu
        [Obrigar(typeof(Paciente))]
        public virtual long PacienteId { get; set; }
        [JsonIgnore]
        public virtual Paciente Paciente { get; set; }
        [Obrigar(typeof(ProfissionalSaude))]
        public virtual long ProfissionalId { get; set; }
        [JsonIgnore]
        public virtual ProfissionalSaude Profissional { get; set; }
        public virtual long? HospitalId { get; set; }
        [JsonIgnore]
        public virtual HospitalUnidade? Hospital { get; set; }
        // Relacionamentos
        [JsonIgnore]
        public virtual IList<ItemReceita> Itens { get; set; } = new List<ItemReceita>();
    }
}
