using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    //Certo
    public class PacienteConsultaController : CrudControllerBase<PacienteConsulta, ConsultaDto>
    {
        PacienteConsultaServico _servico;
        public PacienteConsultaController(PacienteConsultaServico servico, IMapper mapper) : base(servico, mapper) 
        { 
            _servico = servico; 
        }
    }
}
