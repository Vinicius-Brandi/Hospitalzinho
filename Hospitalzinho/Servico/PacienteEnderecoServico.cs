using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
    public class PacienteEnderecoServico : ServicoCrud<PacienteEndereco>
    {
        public PacienteEnderecoServico(IRepositorioSessao repositorio) : base(repositorio) 
        { 
        }
    }
}
