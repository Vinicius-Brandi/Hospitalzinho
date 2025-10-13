using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class ProfissionalSaudeController : CrudControllerBase<ProfissionalSaude>
    {
        ProfissionalSaudeServico _servico;
        public ProfissionalSaudeController(ProfissionalSaudeServico servico) : base(servico)
        {
            _servico = servico;
        }
    }
}
