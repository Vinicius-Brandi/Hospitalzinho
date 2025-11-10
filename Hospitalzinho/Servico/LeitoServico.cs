using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class LeitoServico : ServicoCrud<Leito>
    {
        public LeitoServico(IRepositorioSessao repositorio) : base(repositorio)
        {
        }
    }
}
