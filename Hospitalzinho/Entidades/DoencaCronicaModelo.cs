using FGB.Dominio.Atributos;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class DoencaCronicaModelo : EntidadeBase
    {
        [Obrigar, Unico]
        public virtual string Nome { get; set; } // Ex: "Hipertensão Arterial"
        [Obrigar, Unico]
        public virtual string Cid { get; set; } // Código CID-10
        public virtual string? Descricao { get; set; }
    }
}
