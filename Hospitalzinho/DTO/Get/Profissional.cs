using FGB.Entidades;
using Hospitalzinho.Entidades;
using System.ComponentModel.DataAnnotations;

namespace Hospitalzinho.DTO.Get
{
    public class ProfissionalDto : EntidadeBase
    {
        public string Nome { get; set; } = null!;
        public string RegistroProfissional { get; set; }
        public EspecialidadeDto Especialidade { get; set; }
        public List<ConsultaDto> Consultas { get; set; }
        public List<ExameDto> ExamesSolicitados { get; set; } = new();
        public List<InternacaoDto> Internacoes { get; set; } = new();
        public List<CirurgiaDto> Cirurgias { get; set; } = new();
        public List<VacinacaoDto> VacinacoesAdministradas { get; set; } = new();
        public List<ReceitaDto> ReceitasPrescritas { get; set; } = new();

        public HospitalUnidadeDto Hospital { get; set; } = null!;

    }

    public class ReceitaDto : EntidadeBase
    {
        public virtual DateTime Data { get; set; }
        public string Paciente { get; set; }
        public string ProfResponsavel { get; set; }
        public string ProfRegistro { get; set; }

        public virtual List<ItemReceitaDto> Itens { get; set; } = new();
        public string Hospital { get; set; }
    }
    public class EspecialidadeDto : EntidadeBase
    {
        public string Nome { get; set; }
    }

    public class ItemReceitaDto: EntidadeBase
    {
        public int Quantidade { get; set; }
        public string Posologia { get; set; }
        public MedicamentoModelo Modelo { get; set; }
    }
}
