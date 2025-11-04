using FGB.Entidades;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Hospitalzinho.Entidades
{
    public class PacienteEndereco : EntidadeBase
    {
        [Required]
        public virtual long PacienteId { get; set; }
        [JsonIgnore]
        public virtual Paciente Paciente { get; set; }
        public virtual string Logradouro { get; set; }
        public virtual string Numero { get; set; }
        public virtual string Complemento { get; set; }
        public virtual string Bairro { get; set; }
        [Required]
        public virtual string Cidade { get; set; }
        [Required]
        public virtual string Estado { get; set; }
        public virtual string Cep { get; set; }
    }

}
