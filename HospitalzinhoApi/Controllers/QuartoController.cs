using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class QuartoController : CrudControllerBase<Quarto, QuartoDto>
    {
        //Certo
        QuartoServico _servico;
        public QuartoController(QuartoServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
