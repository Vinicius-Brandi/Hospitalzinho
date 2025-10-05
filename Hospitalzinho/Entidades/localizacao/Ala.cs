﻿using Hospitalzinho.Entidades.EspecificaçõesHospital;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using FGB.Entidades;
namespace Hospitalzinho.Entidades
{
    public class Ala : EntidadeBase
    {
        public virtual string Nome { get; set; } // Ex: "Ala Norte", "Ala Pediatria"
        public virtual IList<Quarto> Quartos { get; set; } = new List<Quarto>();
        [Required]
        public virtual HospitalUnidade Hospital { get; set; }
    }
}
