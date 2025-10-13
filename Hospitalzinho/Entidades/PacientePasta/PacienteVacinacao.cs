using System.ComponentModel.DataAnnotations;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class PacienteVacinacao : EntidadeBase
    {
        [Required]
        public virtual PacienteProntuario Prontuario { get; set; }
        [Required]
        public virtual Vacina Vacina { get; set; }
        [Required]
        public virtual ProfissionalSaude ProfResponsavel { get; set; }
        public virtual DateTime DataAplicacao { get; set; }
        public virtual int DoseNumero { get; set; }
        public virtual string Observacoes { get; set; }
        [Required]
        public virtual HospitalUnidade Hospital { get; set; }

    }
}
