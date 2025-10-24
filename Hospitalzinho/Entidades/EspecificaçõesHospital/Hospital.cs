using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class Hospital : EntidadeBase
    {
        [Required]
        public virtual string Nome { get; set; }
        [Required]
        public virtual string CNES { get; set; } // Código Nacional de Estabelecimentos de Saúde
        [Required]
        public virtual string CNPJ { get; set; }
        public virtual IList<HospitalUnidade> Unidades { get; set; } = new List<HospitalUnidade>();
        [Required]
        public virtual string TokenAcesso { get; set; } = Guid.NewGuid().ToString();
    }
}
