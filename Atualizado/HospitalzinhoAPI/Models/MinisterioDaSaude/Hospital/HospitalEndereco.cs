using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HospitalzinhoAPI.Models.MinisterioDaSaude.Hospital
{
    public class HospitalEndereco
    {
        [Key]
        public int HospitalUnidadeId { get; set; }
        [JsonIgnore]
        public HospitalUnidade HospitalUnidade { get; set; }
        public string CEP { get; set; }
        public string Cidade { get; set; }
        public string Bairro { get; set; }
        public string Rua { get; set; }
        public string Numero { get; set; }
        public string? Complemento { get; set; }

    }
}