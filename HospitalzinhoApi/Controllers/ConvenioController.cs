using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class ConvenioController : CrudControllerBase<Convenio, Convenio>
    {
        ConvenioServico _servico;
        public ConvenioController(ConvenioServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
