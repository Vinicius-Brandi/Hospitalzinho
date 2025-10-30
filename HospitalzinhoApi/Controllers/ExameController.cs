using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    //preciso Testar
    public class ExameController : CrudControllerBase<Exame, Exame>
    {
        ExameServico _servico;
        public ExameController(ExameServico servico, IMapper mapper) : base(servico, mapper) 
        { 
            _servico = servico;
        }
    }
}
