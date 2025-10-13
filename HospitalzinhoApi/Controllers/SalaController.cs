using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class SalaController : CrudControllerBase<Sala>
    {
        SalaServico _servico;
        public SalaController(SalaServico servico) : base(servico)
        {
            _servico = servico;
        }
    }
}
