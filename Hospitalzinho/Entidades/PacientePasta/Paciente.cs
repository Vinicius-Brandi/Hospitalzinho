using Hospitalzinho.Enum;
using FGB.Entidades;
using System.Text.Json.Serialization;
using FGB.Dominio.Atributos;

namespace Hospitalzinho.Entidades
{
    public class Paciente : EntidadeBase
    {
        [Obrigar]
        public virtual string Nome { get; set; }
        [Obrigar, Unico]
        public virtual string CNS { get; set; } // Cartão Nacional de Saúde
        [Obrigar, Unico, Cpf]
        public virtual string Cpf { get; set; }
        public virtual DateTime DataNascimento { get; set; }
        public virtual string? NomePai { get; set; }
        public virtual string? NomeMae { get; set; }
        public virtual string? CpfPai { get; set; }
        public virtual string? CpfMae { get; set; }
        public virtual bool Ativo { get; set; } = true;
        public virtual SexoPaciente? Sexo { get; set; }
        public virtual string? Nacionalidade { get; set; }
        public virtual RacaPaciente? Raca { get; set; }
        public virtual string? Naturalidade { get; set; }
        public virtual EscolaridadePaciente? Escolaridade { get; set; }
        [JsonIgnore]
        public virtual IList<PacienteConvenio> Convenios { get; set; } = new List<PacienteConvenio>();
        [JsonIgnore]
        public virtual PacienteProntuario? Prontuario { get; set; }
        [JsonIgnore]
        public virtual PacienteContato? Contato { get; set; }
        [JsonIgnore]
        public virtual PacienteEndereco? Endereco { get; set; }
        }
}