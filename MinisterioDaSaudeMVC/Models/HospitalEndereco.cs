namespace MinisterioDaSaudeMVC.Models
{
    public class HospitalEndereco
    {
        public virtual long CEP { get; set; }
        public virtual long Cidade { get; set; }
        public virtual long Bairro { get; set; }
        public virtual long Rua { get; set; }
        public virtual long Numero { get; set; }
        public virtual long Complemento { get; set; }
    }
}