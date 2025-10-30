using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    //Certo
    public class DoencaCronicaModeloController : CrudControllerBase<DoencaCronicaModelo, DoencaCronicaModelo>
    {
        DoencaCronicaModeloServico _servico;
        public DoencaCronicaModeloController(DoencaCronicaModeloServico servico, IMapper mapper) : base(servico, mapper) 
        { 
            _servico = servico; 
        }
    }
}
