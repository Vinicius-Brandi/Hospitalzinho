using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class PacienteAlergiaServico : ServicoCrud<PacienteAlergia>
    {
        public PacienteAlergiaServico(IRepositorioSessao repositorio) : base(repositorio)
        {

        }
    }
}
