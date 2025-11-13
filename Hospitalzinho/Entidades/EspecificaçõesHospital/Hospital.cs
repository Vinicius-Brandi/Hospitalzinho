using System.Text.Json.Serialization;
using FGB.Dominio.Atributos;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class Hospital : EntidadeBase
    {
        [Obrigar]
        public virtual string Nome { get; set; }
        [Obrigar,Unico]
        public virtual string CNPJ { get; set; }
        [JsonIgnore]
        public virtual IList<HospitalUnidade> Unidades { get; set; } = new List<HospitalUnidade>();
        [Obrigar]
        public virtual string TokenAcesso { get; set; } = Guid.NewGuid().ToString();
    }
}