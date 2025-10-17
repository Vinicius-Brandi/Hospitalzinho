using HospitalzinhoAPI.Models.MinisterioDaSaude.Hospital;

namespace HospitalzinhoAPI.DTO.Hospital
{
    public class HospitalUnidadeDTO
    {
        public string Nome { get; set; }
        public HospitalTipo HospitalTipo { get; set; }
        public HospitalEnderecoDTO Endereco { get; set; }
        public HospitalInstituicaoDTO HospitalInstituicao { get; set; }
    }
}
