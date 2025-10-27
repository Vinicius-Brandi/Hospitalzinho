using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class VacinaModeloController : CrudControllerBase<VacinaModelo, VacinaModelo>
    {
        VacinaModeloServico _servico;
        public VacinaModeloController(VacinaModeloServico servico, IMapper mapper) : base(servico, mapper) 
        { 
            _servico = servico; 
        }
    }
}
