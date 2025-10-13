using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class PacienteCirurgiaServico : ServicoCrud<PacienteCirurgia>
    {
        public PacienteCirurgiaServico(IRepositorioSessao repositorio) : base(repositorio) 
        {
        
        }
    }
}
