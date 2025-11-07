using FGB.Dominio.Interfaces;
using FGB.Entidades;
using Hospitalzinho.Entidades;
using System.ComponentModel.DataAnnotations;

namespace Hospitalzinho.DTO.Get
{
    public class HospitalDto : EntidadeBase
    {
        public string Nome { get; set; } = string.Empty;
        public string CNPJ { get; set; } = string.Empty;
        public string TokenAcesso { get; set; } = string.Empty;
        public List<HospitalUnidadeDto> Unidades { get; set; } = new();
    }

    public class HospitalUnidadeDto : EntidadeBase
    {
        public string Nome { get; set; } = string.Empty;
        public string CNES { get; set; } = string.Empty;
        public string TipoUnidade { get; set; } = string.Empty;
        public HospitalEndereco Endereco { get; set; } 
    }
}