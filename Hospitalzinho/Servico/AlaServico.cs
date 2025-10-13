using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class AlaServico : ServicoCrud<Ala>
    {
        public AlaServico(IRepositorioSessao repositorio) : base(repositorio)
        {
        }
    }
}
