using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class LeitoController : CrudControllerBase<Leito, Leito>
    {
        //Certo
        LeitoServico _servico;
        public LeitoController(LeitoServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
