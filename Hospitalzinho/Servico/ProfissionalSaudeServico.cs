using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.Entidades;

namespace Hospitalzinho.Servico
{
	public class ProfissionalSaudeServico : ServicoCrud<ProfissionalSaude>
	{
		public ProfissionalSaudeServico(IRepositorioSessao repositorio) : base(repositorio)
		{
		}
	}
}

