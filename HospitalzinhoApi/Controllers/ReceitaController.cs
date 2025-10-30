using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    //Certo
    public class ReceitaController : CrudControllerBase<Receita, ReceitaDto>
    {
        ReceitaServico _servico;
        public ReceitaController(ReceitaServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
