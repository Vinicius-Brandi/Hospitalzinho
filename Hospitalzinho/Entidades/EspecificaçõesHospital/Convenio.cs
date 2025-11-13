using FGB.Dominio.Atributos;
using FGB.Entidades;
using System.Text.Json.Serialization;

namespace Hospitalzinho.Entidades
{
        public class Convenio : EntidadeBase
    {
        [Obrigar, Unico]
        public virtual string CodigoANS { get; set; }
        [Unico]
        public virtual string? CNPJ { get; set; }
        [Obrigar]
        public virtual string Nome { get; set; } = null!;
        [JsonIgnore]
        public virtual IList<PacienteConvenio> PacienteConvenios { get; set; } = new List<PacienteConvenio>();
        [JsonIgnore]
        public virtual IList<HospitalUnidade> HospitaisAtentidos { get; set; } = new List<HospitalUnidade>();
    }
}

