using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteContatoController : CrudControllerBase<PacienteContato, PacienteContato>
    {
        PacienteContatoServico _servico;
        public PacienteContatoController(PacienteContatoServico servico, IMapper mapper) : base(servico, mapper) 
        { 
            _servico = servico; 
        }
    }
}
