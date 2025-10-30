using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class VacinaController : CrudControllerBase<Vacina, VacinaDto>
    {
        //Completo
        VacinaServico _servico;
        public VacinaController(VacinaServico servico, IMapper mapper) : base(servico, mapper) 
        { 
            _servico = servico; 
        }
    }
}
