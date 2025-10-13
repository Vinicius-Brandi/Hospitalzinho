using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class PacienteConsultaServico : ServicoCrud<PacienteConsulta>
    {
        public PacienteConsultaServico(IRepositorioSessao repositorio) : base(repositorio)
        { 
        }
    }
}
