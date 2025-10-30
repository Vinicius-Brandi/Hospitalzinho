using FGB.Entidades;
using Hospitalzinho.Entidades;
using System.ComponentModel.DataAnnotations;

namespace Hospitalzinho.DTO.Get
{
    public class ItemReceitaDto : EntidadeBase
    {
        public int Quantidade { get; set; }
        public string Posologia { get; set; }
        public MedicamentoModelo Modelo { get; set; }
    }

    public class MedicamentoDto : EntidadeBase
    {
        public MedicamentoModelo Modelo { get; set; }
        public string Lote { get; set; }
        public DateTime DataFabricacao { get; set; }
        public DateTime DataValidade { get; set; }
        public int QuantidadeDisponivel { get; set; } // Quantidade em estoque
        public string Hospital { get; set; }
    }

    public class PacienteMedicacaoDto : EntidadeBase
    {
        public string Paciente { get; set; }
        public MedicamentoModelo Modelo { get; set; } // Tipo do remédio prescrito
        public string DosagemPrescrita { get; set; } // Ex: "1 comprimido 2x ao dia"
        public string Frequencia { get; set; } // Ex: "12 em 12 horas"
        public string ViaAdministracao { get; set; } // Oral, Injetável
        public string Observacoes { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime? DataFim { get; set; } // null = uso contínuo
    }

    public class VacinaDto : EntidadeBase
    {
        public string Lote { get; set; } // Lote da vacina
        public DateTime DataProducao { get; set; }
        public DateTime DataValidade { get; set; }
        public int QuantidadeDisponivel { get; set; } // Quantidade disponível no estoque
        public VacinaModelo VacinaModelo { get; set; } // Referência ao modelo
        public HospitalUnidade Hospital { get; set; }
    }
}