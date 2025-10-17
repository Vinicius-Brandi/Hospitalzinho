using HospitalzinhoAPI.Models.MinisterioDaSaude.Hospital;
using System.Text.Json.Serialization;

namespace HospitalzinhoAPI.DTO.Hospital
{
    public class HospitalInstituicaoDTO
    {
        public string Nome { get; set; }
        public string CNES { get; set; }
        public string CNPJ { get; set; }
        public string? TokenAcesso { get; set; }
    }
}