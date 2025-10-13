using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class EspecialidadeServico : ServicoCrud<Especialidade>
    {
        public EspecialidadeServico(IRepositorioSessao repositorio) : base(repositorio)
        {
        }
    }
}
