using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteDoencaCronicaController : CrudControllerBase<PacienteDoencaCronica, PacienteDoencaDto>
    {
        //Certo
        PacienteDoencaCronicaServico _servico;
        public PacienteDoencaCronicaController(PacienteDoencaCronicaServico servico, IMapper mapper) : base(servico, mapper) 
        { 
            _servico = servico; 
        }
    }
}
