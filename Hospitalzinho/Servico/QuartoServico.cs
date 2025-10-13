using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class QuartoServico : ServicoCrud<Quarto>
    {
        public QuartoServico(IRepositorioSessao repositorio) : base(repositorio)
        {
        }
    }
}
