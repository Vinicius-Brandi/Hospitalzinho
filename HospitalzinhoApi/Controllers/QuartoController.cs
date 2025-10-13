using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class QuartoController : CrudControllerBase<Quarto>
    {
        QuartoServico _servico;
        public QuartoController(QuartoServico servico) : base(servico)
        {
            _servico = servico;
        }
    }
}
