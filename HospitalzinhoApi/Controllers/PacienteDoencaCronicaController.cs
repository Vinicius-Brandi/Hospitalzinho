using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteDoencaCronicaController : CrudControllerBase<PacienteDoencaCronica, PacienteDoencaCronica>
    {
        PacienteDoencaCronicaServico _servico;
        public PacienteDoencaCronicaController(PacienteDoencaCronicaServico servico, IMapper mapper) : base(servico, mapper) 
        { 
            _servico = servico; 
        }
    }
}
