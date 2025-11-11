using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FGB.Entidades;
namespace Hospitalzinho.Entidades
{
    public class Receita : EntidadeBase
    {
        public virtual DateTime Data { get; set; }

        // FK - Paciente e Profissional que prescreveu
        [Required]
        public virtual long PacienteId { get; set; }
        [JsonIgnore]
        public virtual Paciente Paciente { get; set; }
        [Required]
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
