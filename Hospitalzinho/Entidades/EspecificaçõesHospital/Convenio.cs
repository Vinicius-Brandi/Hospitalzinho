using FGB.Entidades;
using System.ComponentModel.DataAnnotations;

namespace Hospitalzinho.Entidades
{
        public class Convenio : EntidadeBase
    {
        public virtual string? CNPJ { get; set; }
        [Required]
        public virtual string Nome { get; set; } = null!;
        public virtual IList<PacienteConvenio> PacienteConvenios { get; set; } = new List<PacienteConvenio>();
        public virtual IList<HospitalUnidade> HospitaisAtentidos { get; set; } = new List<HospitalUnidade>();
    }
}

