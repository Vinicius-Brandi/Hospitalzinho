using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class PacienteVacinacaoServico : ServicoCrud<PacienteVacinacao>
    {
        public PacienteVacinacaoServico(IRepositorioSessao repositorio) : base(repositorio)
        {
        }
    }
}
