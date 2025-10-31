using FGB.Entidades;
using Hospitalzinho.Entidades;
using Hospitalzinho.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hospitalzinho.DTO.Post
{
    public class PacientePostDto :EntidadeBase
    {
        [Required]
        public string Nome { get; set; }
        [Required]
        public string CNS { get; set; } // Cartão Nacional de Saúde
        [Required]
        public string Cpf { get; set; }
        public DateTime DataNascimento { get; set; }
        public string? NomePai { get; set; }
        public string? NomeMae { get; set; }
        public string? CpfPai { get; set; }
        public string? CpfMae { get; set; }
        public virtual bool Ativo { get; set; } = true;
        public virtual SexoPaciente? Sexo { get; set; }
        public string? Nacionalidade { get; set; }
        public virtual RacaPaciente? Raca { get; set; }
        public string? Naturalidade { get; set; }
        public virtual EscolaridadePaciente? Escolaridade { get; set; }
        //public virtual List<PacienteContato> Contatos { get; set; } = new List<PacienteContato>();
        public string? TelefoneResidencial { get; set; }
        public string? TelefoneCelular { get; set; }
        public string? Email { get; set; }
        public virtual List<PacienteEndereco> Enderecos { get; set; } = new List<PacienteEndereco>();

        public TipoSanguineo TipoSanguineo { get; set; }
    }

    public class sacanagem : Paciente
    {

    }
}
