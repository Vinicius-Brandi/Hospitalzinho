using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class VacinaServico : ServicoCrud<Vacina>
    {
        public VacinaServico(IRepositorioSessao repositorio) : base(repositorio) 
        { 
        }
    }
}
