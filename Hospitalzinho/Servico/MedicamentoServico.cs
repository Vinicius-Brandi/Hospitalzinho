using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class MedicamentoServico : ServicoCrud<Medicamento>
    {
        public MedicamentoServico(IRepositorioSessao repositorio) : base(repositorio)
        {
        }
    }
}
