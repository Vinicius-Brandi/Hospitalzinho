using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class PacienteContato : EntidadeBase
    {
        [Required]
        public virtual long PacienteId { get; set; }
        public virtual string? TelefoneResidencial { get; set; }
        public virtual string? TelefoneCelular { get; set; }
        public virtual string? Email { get; set; }
    }
}
