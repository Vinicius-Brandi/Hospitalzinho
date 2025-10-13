using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class DoencaCronicaModeloController : CrudControllerBase<DoencaCronicaModelo>
    {
        DoencaCronicaModeloServico _servico;
        public DoencaCronicaModeloController(DoencaCronicaModeloServico servico) : base(servico) 
        { 
            _servico = servico; 
        }
    }
}
