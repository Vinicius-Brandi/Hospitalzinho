using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteProntuarioController : CrudControllerBase<PacienteProntuario, PacienteProntuario>
    {
        PacienteProntuarioServico _servico;
        public PacienteProntuarioController(PacienteProntuarioServico servico, IMapper mapper) : base(servico, mapper) 
        {
            _servico = servico;
        }
    }
}

