using System.Text.Json.Serialization;
using FGB.Dominio.Atributos;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
        public class PacienteConvenio : EntidadeBase
    {
        [Obrigar]
        public virtual long PacienteId { get; set; }
        [JsonIgnore]
        public virtual Paciente Paciente { get; set; }
        [Obrigar]
        public virtual long ConvenioId { get; set; }
        [JsonIgnore]
        public virtual Convenio Convenio { get; set; }
        [Obrigar]
        public virtual string NumeroCarteirinha { get; set; }
        public virtual DateTime? Validade { get; set; }
        public virtual bool Ativo { get; set; } = true;
    }
}