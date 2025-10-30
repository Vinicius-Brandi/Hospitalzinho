using FGB.Entidades;
using Hospitalzinho.Entidades;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hospitalzinho.DTO.Get
{
    public class PacienteDoencaDto : EntidadeBase
    {
        public string Paciente { get; set; }
        public string PacienteCNS { get; set; }
        public DoencaCronicaModelo Modelo { get; set; }
        public DateTime DataDiagnostico { get; set; }
        public string Estagio { get; set; } // Ex: "Leve", "Moderada", "Avançada"
        public string Observacoes { get; set; }
        public bool EmTratamento { get; set; }
    }
}
