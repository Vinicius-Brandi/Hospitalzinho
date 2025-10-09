using Hospitalzinho.Entidades.PacientePasta;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hospitalzinho.DTO.Envio
{
    public class PacienteProntuarioDTO
    {
        public Paciente Paciente { get; set; }
        public TipoSanguineo TipoSangue { get; set; }
    }
}
