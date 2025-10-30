using FGB.Entidades;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.DTO.Get
{

    public class AlaDto : EntidadeBase
    {
        public string Nome { get; set; }
        public List<QuartoDto> Quartos { get; set; } = new();
        public List<SalaDto> Salas { get; set; } = new();
        public HospitalUnidadeDto Hospital { get; set; }
    }
    public class QuartoDto : EntidadeBase
    {
        public string Numero { get; set; }
        public AlaDto Ala { get; set; }
        public TipoQuarto Tipo { get; set; }
        public int Capacidade { get; set; }
        public List<InternacaoDto> Internacoes { get; set; } = new();
    }

    public class SalaDto : EntidadeBase
    {
        public string Numero { get; set; }
        public AlaDto Ala { get; set; }
        public TipoSala Tipo { get; set; }
        public List<ConsultaDto> Consultas { get; set; } = new();
    }
}
