using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class HospitalEndereco : EntidadeBase
    {
        public virtual string CEP { get; set; }
        public virtual string Cidade { get; set; }
        public virtual string Bairro { get; set; }
        public virtual string Rua {  get; set; }
        public virtual string? Numero { get; set; }
        public virtual string? Complemento { get; set; }
    }
}
