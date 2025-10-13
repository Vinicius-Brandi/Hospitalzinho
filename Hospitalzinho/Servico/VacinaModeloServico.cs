using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class VacinaModeloServico : ServicoCrud<VacinaModelo>
    {
        public VacinaModeloServico(IRepositorioSessao repositorio) : base(repositorio) 
        { 
        }
    }
}
