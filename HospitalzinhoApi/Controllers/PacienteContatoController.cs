using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    //Certo
    public class PacienteContatoController : CrudControllerBase<PacienteContato, PacienteContatoDto>
    {
        PacienteContatoServico _servico;
        public PacienteContatoController(PacienteContatoServico servico, IMapper mapper) : base(servico, mapper) 
        { 
            _servico = servico; 
        }
    }
}
