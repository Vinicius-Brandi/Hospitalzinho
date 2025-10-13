using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class MedicamentoModeloServico : ServicoCrud<MedicamentoModelo>
    {
        public MedicamentoModeloServico(IRepositorioSessao repositorio) : base(repositorio)
        {
        }
    }
}
