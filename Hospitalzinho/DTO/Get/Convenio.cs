using FGB.Entidades;

namespace Hospitalzinho.DTO.Get
{
    public class ConvenioDto : EntidadeBase
    {
        public string? CNPJ { get; set; }
        public string Nome { get; set; }
        public string CodigoANS { get; set; }
        public List<PacienteConvenioDto> PacienteConvenios { get; set; } = new();
        public List<HospitalUnidadeDto> HospitaisAtentidos { get; set; } = new();
    }

    public class PacienteConvenioDto : EntidadeBase
    {
        public string PacienteNome { get; set; }
        public string PacienteCpf { get; set; }
        public string ConvenioCNPJ { get; set; }
        public string NumeroCarteirinha { get; set; }
        public DateTime? Validade { get; set; }
        public bool Ativo { get; set; }
    }
}
