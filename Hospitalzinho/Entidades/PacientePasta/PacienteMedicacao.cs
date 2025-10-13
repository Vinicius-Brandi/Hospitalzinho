using System.ComponentModel.DataAnnotations;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class PacienteMedicacao : EntidadeBase
    {
        [Required]
        public virtual PacienteProntuario Prontuario { get; set; }
        [Required]
        public virtual MedicamentoModelo Modelo { get; set; } // Tipo do remédio prescrito
        public virtual string DosagemPrescrita { get; set; } // Ex: "1 comprimido 2x ao dia"
        public virtual string Frequencia { get; set; } // Ex: "12 em 12 horas"
        public virtual string ViaAdministracao { get; set; } // Oral, Injetável
        public virtual string Observacoes { get; set; }
        public virtual DateTime DataInicio { get; set; }
        public virtual DateTime? DataFim { get; set; } // null = uso contínuo
    }
}
