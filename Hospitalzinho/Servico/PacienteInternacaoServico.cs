using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class PacienteInternacaoServico : ServicoCrud<PacienteInternacao>
    {
        public PacienteInternacaoServico(IRepositorioSessao repositorio) : base(repositorio) 
        { 
        }
    }
}
