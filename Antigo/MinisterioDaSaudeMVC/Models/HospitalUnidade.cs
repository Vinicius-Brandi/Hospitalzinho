namespace MinisterioDaSaudeMVC.Models
{
    public class HospitalUnidade
    {
        public string Nome { get; set; }
        public TipoUnidade TipoUnidade { get; set; }
        public HospitalEndereco Endereco { get; set; }
        public Hospital InstituicaoPai { get; set; }
    }
}
