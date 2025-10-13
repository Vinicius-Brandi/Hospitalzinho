using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class ItemReceitaServico : ServicoCrud<ItemReceita>
    {
        public ItemReceitaServico(IRepositorioSessao repositorio) : base(repositorio)
        {
        }
    }
}
