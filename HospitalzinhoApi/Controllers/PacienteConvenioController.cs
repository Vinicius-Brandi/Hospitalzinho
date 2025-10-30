using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteConvenioController : CrudControllerBase<PacienteConvenio, PacienteConvenioDto>
    {
        //Certo
        PacienteConvenioServico _servico;
        public PacienteConvenioController(PacienteConvenioServico servico, IMapper mapper) : base(servico, mapper) 
        { 
            _servico = servico; 
        }
    }
}
