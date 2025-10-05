﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FGB.Entidades;
namespace Hospitalzinho.Entidades.PacientePasta
{
    public class PacienteContato : EntidadeBase
    {
        [Required]
        public virtual Paciente Paciente { get; set; }
        public virtual string TelefoneResidencial { get; set; }
        public virtual string TelefoneCelular { get; set; }
        public virtual string Email { get; set; }
    }
}
