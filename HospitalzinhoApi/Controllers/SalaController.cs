using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class SalaController : CrudControllerBase<Sala, SalaDto>
    {
        //Certo
        SalaServico _servico;
        public SalaController(SalaServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
