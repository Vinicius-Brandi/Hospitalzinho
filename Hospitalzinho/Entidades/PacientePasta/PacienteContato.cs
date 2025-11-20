using FGB.Dominio.Atributos;
using FGB.Entidades;
using System.Text.Json.Serialization;

namespace Hospitalzinho.Entidades
{
    public class PacienteContato : EntidadeBase
    {
        [Obrigar(typeof(Paciente)), Unico(typeof(Paciente))]
        public virtual long PacienteId { get; set; }
        [JsonIgnore]
        public virtual Paciente Paciente { get; set; }
        public virtual string? TelefoneResidencial { get; set; }
        public virtual string? TelefoneCelular { get; set; }
        public virtual string? Email { get; set; }
    }
}
