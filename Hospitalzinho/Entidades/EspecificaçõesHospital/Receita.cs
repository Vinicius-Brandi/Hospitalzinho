using System.ComponentModel.DataAnnotations;


using FGB.Entidades;
namespace Hospitalzinho.Entidades
{
    public class Receita : EntidadeBase
    {
        public virtual DateTime Data { get; set; }

        // FK - Paciente e Profissional que prescreveu
        [Required]
        public virtual Paciente Paciente { get; set; }
        [Required]
        public virtual ProfissionalSaude Profissional { get; set; }

        // Relacionamentos
        public virtual IList<ItemReceita> Itens { get; set; } = new List<ItemReceita>();
        public virtual HospitalUnidade? Hospital { get; set; }
    }
}
