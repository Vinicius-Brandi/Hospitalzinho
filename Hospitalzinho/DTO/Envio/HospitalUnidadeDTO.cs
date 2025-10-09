using FGB.Entidades;
using Hospitalzinho.Entidades;
using Hospitalzinho.Entidades.EspecificaçõesHospital;
using Hospitalzinho.Entidades.PacientePasta;
using Hospitalzinho.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hospitalzinho.DTO.Envio
{
    public class HospitalUnidadeDTO
    {
        public string Nome { get; set; }
        public TipoUnidade TipoUnidade { get; set; }
        public HospitalEndereco Endereco { get; set; }
        public Hospital InstituicaoPai { get; set; }
    }
}