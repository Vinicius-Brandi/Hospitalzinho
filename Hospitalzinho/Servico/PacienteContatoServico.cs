using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class PacienteContatoServico : ServicoCrud<PacienteContato>
    {
        public PacienteContatoServico(IRepositorioSessao repositorio) : base(repositorio) 
        {
        }
    }
}
