using System.ComponentModel.DataAnnotations;

namespace MinisterioDaSaudeMVC.Models
{
    public class Hospital
    {
        [Required]
        public virtual string Nome { get; set; }
        [Required]
        public virtual string CNES { get; set; } // Código Nacional de Estabelecimentos de Saúde
        [Required]
        public virtual string CNPJ { get; set; }
        public virtual IList<HospitalUnidade> Unidades { get; set; } = new List<HospitalUnidade>();
        [Required]
        public virtual string TokenAcesso { get; set; }
    }
}