using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class AlergiaServico : ServicoCrud<Alergia>
    {
        public AlergiaServico(IRepositorioSessao repositorio) : base(repositorio) 
        {
        }
    }
}
