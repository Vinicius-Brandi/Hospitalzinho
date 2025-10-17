namespace HospitalzinhoAPI.Models.Hospital.Paciente
{
    public class PacienteModel
    {
        public int Id { get; set; }
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
        public PacienteEndereco? Endereco { get; set; }
        public PacienteContato? Contato { get; set; }
        public PacienteConvenio? Convenio { get; set; }
    }
}
