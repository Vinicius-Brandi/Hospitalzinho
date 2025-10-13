using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class ReceitaServico : ServicoCrud<Receita>
    {
        public ReceitaServico(IRepositorioSessao repositorio) : base(repositorio)
        {
        }
    }
}
