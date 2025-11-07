using FGB.Entidades;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Hospitalzinho.Entidades
{
        public class Convenio : EntidadeBase
    {
        [Required]
        public virtual string CodigoANS { get; set; }
        public virtual string? CNPJ { get; set; }
        [Required]
        public virtual string Nome { get; set; } = null!;
        [JsonIgnore]
        public virtual IList<PacienteConvenio> PacienteConvenios { get; set; } = new List<PacienteConvenio>();
        [JsonIgnore]
        public virtual IList<HospitalUnidade> HospitaisAtentidos { get; set; } = new List<HospitalUnidade>();
    }
}

