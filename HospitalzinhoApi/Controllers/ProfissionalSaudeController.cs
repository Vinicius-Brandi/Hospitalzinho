using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class ProfissionalSaudeController : CrudControllerBase<ProfissionalSaude, ProfissionalSaude>
    {
        ProfissionalSaudeServico _servico;
        public ProfissionalSaudeController(ProfissionalSaudeServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
