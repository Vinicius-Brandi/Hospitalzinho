using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class ConvenioServico : ServicoCrud<Convenio>
    {
        public ConvenioServico(IRepositorioSessao repositorio) : base(repositorio)
        {
        }
    }
}
