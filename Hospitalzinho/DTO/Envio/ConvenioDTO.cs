using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hospitalzinho.DTO.Envio
{
    internal class ConvenioDTO
    {
        public string? CNPJ { get; set; }
        public string Nome { get; set; } = null!;
    }
}
