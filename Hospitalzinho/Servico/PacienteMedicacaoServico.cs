using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class PacienteMedicacaoServico : ServicoCrud<PacienteMedicacao>
    {
        public PacienteMedicacaoServico(IRepositorioSessao repositorio) : base(repositorio) 
        { 
        }
    }
}
