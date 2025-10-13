using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class VacinaController : CrudControllerBase<Vacina>
    {
        VacinaServico _servico;
        public VacinaController(VacinaServico servico) : base(servico) 
        { 
            _servico = servico; 
        }
    }
}
