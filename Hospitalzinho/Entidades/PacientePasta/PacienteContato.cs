using FGB.Entidades;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Hospitalzinho.Entidades
{
    public class PacienteContato : EntidadeBase
    {
        [Required]
        public virtual long PacienteId { get; set; }
        [JsonIgnore]
        public virtual Paciente Paciente { get; set; }
        public virtual string? TelefoneResidencial { get; set; }
        public virtual string? TelefoneCelular { get; set; }
        public virtual string? Email { get; set; }
    }
}
