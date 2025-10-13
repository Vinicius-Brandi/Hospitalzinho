using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class HospitalEnderecoServico : ServicoCrud<HospitalEndereco>
    {
        public HospitalEnderecoServico(IRepositorioSessao repositorio) : base(repositorio) 
        { 
        }
    }
}
