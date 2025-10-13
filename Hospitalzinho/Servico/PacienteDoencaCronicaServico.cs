using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class PacienteDoencaCronicaServico : ServicoCrud<PacienteDoencaCronica>
    {
        public PacienteDoencaCronicaServico(IRepositorioSessao repositorio) : base(repositorio) 
        { 
        }
    }
}
