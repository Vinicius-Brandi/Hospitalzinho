using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class DoencaCronicaModeloServico : ServicoCrud<DoencaCronicaModelo>
    {
        public DoencaCronicaModeloServico(IRepositorioSessao repositorio) : base(repositorio) 
        { 
        }
    }
}
