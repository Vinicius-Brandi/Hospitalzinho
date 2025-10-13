using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class PacienteExameServico : ServicoCrud<PacienteExame>
    {
        public PacienteExameServico(IRepositorioSessao repositorio) : base(repositorio) 
        { 
        }
    }
}
