using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class PacienteConvenioServico : ServicoCrud<PacienteConvenio>
    {
        public PacienteConvenioServico(IRepositorioSessao repositorio) : base(repositorio) 
        { 
        }
    }
}
