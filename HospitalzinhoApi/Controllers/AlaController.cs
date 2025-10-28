using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;
using Hospitalzinho.DTO.Get;

namespace HospitalzinhoApi.Controllers
{
    public class AlaController : CrudControllerBase<Ala, AlaDto>
    {
        AlaServico _servico;
        public AlaController(AlaServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
