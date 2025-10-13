using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class ExameServico : ServicoCrud<Exame>
    {
        public ExameServico(IRepositorioSessao repositorio) : base(repositorio) 
        {
        }
    }
}
