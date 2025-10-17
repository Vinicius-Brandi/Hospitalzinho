using System.ComponentModel.DataAnnotations;

namespace HospitalzinhoAPI.Models.MinisterioDaSaude.Hospital
{
    public class HospitalUnidade
    {
        [Key]
        public int Id { get; set; }
        public string Nome { get; set; }
        public HospitalTipo HospitalTipo { get; set; }
        public HospitalEndereco Endereco { get; set; }
        public HospitalInstituicao HospitalInstituicao { get; set; }
    }
}