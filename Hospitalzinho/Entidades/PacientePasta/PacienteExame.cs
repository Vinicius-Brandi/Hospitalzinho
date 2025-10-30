using System.ComponentModel.DataAnnotations;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class PacienteExame : EntidadeBase
    {
        [Required]
        public virtual PacienteProntuario Prontuario { get; set; }
        public virtual DateTime DataExame { get; set; }
        [Required]
        public virtual Exame tipoExame { get; set; } // Ex: "Sangue", "Raio-X"
        public virtual string? Laboratorio { get; set; }
        public virtual string? Resultados { get; set; }
        public virtual string? Observacoes { get; set; }
        [Required]
        public virtual ProfissionalSaude ProfResponsavel { get; set; }
        [Required]
        public virtual HospitalUnidade Hospital { get; set; }
    }
}
