﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

using FGB.Entidades;
namespace Hospitalzinho.Entidades
{
    public class HospitalEndereco : EntidadeBase
    {
        public virtual long CEP { get; set; }
        public virtual long Cidade { get; set; }
        public virtual long Bairro { get; set; }
        public virtual long Rua {  get; set; }
        public virtual long Numero { get; set; }
        public virtual long Complemento { get; set; }
    }
}
