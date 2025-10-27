using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteConsultaController : CrudControllerBase<PacienteConsulta, PacienteConsulta>
    {
        PacienteConsultaServico _servico;
        public PacienteConsultaController(PacienteConsultaServico servico, IMapper mapper) : base(servico, mapper) 
        { 
            _servico = servico; 
        }
    }
}
