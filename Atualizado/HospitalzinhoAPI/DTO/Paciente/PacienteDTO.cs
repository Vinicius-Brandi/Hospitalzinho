using HospitalzinhoAPI.Models.Hospital.Paciente;

namespace HospitalzinhoAPI.DTO.Paciente
{
    public class PacienteDTO
    {
        public string Nome { get; set; }
        public string CNS { get; set; }
        public string CPF { get; set; }
        public string? NomePai { get; set; }
        public string? NomeMae { get; set; }
        public string? CPFPai { get; set; }
        public string? CPFMae { get; set; }
        public string? Nacionalidade { get; set; }
        public string? Naturalidade { get; set; }
        public DateTime? DataNascimento { get; set; }
        public PacienteGenero? Genero { get; set; }
        public PacienteEtinia? Etinia { get; set; }
        public PacienteEscolaridade? Escolaridade { get; set; }
        public PacienteEnderecoDTO? Endereco { get; set; }
        public PacienteContatoDTO? Contato { get; set; }
    }
}
