using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class VacinaModeloController : CrudControllerBase<VacinaModelo>
    {
        VacinaModeloServico _servico;
        public VacinaModeloController(VacinaModeloServico servico) : base(servico) 
        { 
            _servico = servico; 
        }
    }
}
