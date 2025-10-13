using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteContatoController : CrudControllerBase<PacienteContato>
    {
        PacienteContatoServico _servico;
        public PacienteContatoController(PacienteContatoServico servico) : base(servico) 
        { 
            _servico = servico; 
        }
    }
}
