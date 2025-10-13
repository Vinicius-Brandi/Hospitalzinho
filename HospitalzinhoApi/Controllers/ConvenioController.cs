using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class ConvenioController : CrudControllerBase<Convenio>
    {
        ConvenioServico _servico;
        public ConvenioController(ConvenioServico servico) : base(servico)
        {
            _servico = servico;
        }
    }
}
