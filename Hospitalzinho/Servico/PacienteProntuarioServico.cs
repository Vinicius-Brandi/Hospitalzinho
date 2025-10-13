using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class PacienteProntuarioServico : ServicoCrud<PacienteProntuario>
    {
        public PacienteProntuarioServico(IRepositorioSessao repositorio) : base(repositorio) 
        { 
        }
    }
}

