using System.ComponentModel.DataAnnotations;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
        public class PacienteConvenio : EntidadeBase
    {
        [Required]
        public virtual Paciente Paciente { get; set; }
        [Required]

        public virtual Convenio Convenio { get; set; }
        [Required]
        public virtual string NumeroCarteirinha { get; set; }
        public virtual DateTime? Validade { get; set; }
        public virtual bool Ativo { get; set; }
    }
}