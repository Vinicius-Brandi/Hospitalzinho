using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HospitalzinhoAPI.Models.MinisterioDaSaude.Hospital
{
    public class HospitalInstituicao
    {
        [Key]
        public int Id { get; set; }
        public string Nome { get; set; }
        public string CNES { get; set; }
        public string CNPJ { get; set; }
        [JsonIgnore]
        public ICollection<HospitalUnidade> Unidades { get; set; }
        public string? TokenAcesso { get; set; }
    }
}
