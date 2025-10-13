using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteExameController : CrudControllerBase<PacienteExame>
    {
        PacienteExameServico _servico;
        public PacienteExameController(PacienteExameServico servico) : base(servico) 
        { 
            _servico = servico; 
        }
    }
}
