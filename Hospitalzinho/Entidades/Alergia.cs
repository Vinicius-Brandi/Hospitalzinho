using FGB.Dominio.Atributos;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class Alergia : EntidadeBase
    {
        [Obrigar, Unico]
        public virtual string Nome { get; set; }
        [Obrigar]
        public virtual TipoAlergia Tipo { get; set; }
    }
}