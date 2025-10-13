using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class SalaServico : ServicoCrud<Sala>
    {
        public SalaServico(IRepositorioSessao repositorio) : base(repositorio)
        {
        }
    }
}
