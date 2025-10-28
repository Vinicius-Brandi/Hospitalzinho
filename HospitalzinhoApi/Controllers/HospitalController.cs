using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Servico;
using AutoMapper;

namespace HospitalzinhoApi.Controllers
{
    public class HospitalController : CrudControllerBase<Hospital, HospitalDto>
    {
        public HospitalController(HospitalServico servico, IMapper mapper)
            : base(servico, mapper)
        {
        }
    }
}
