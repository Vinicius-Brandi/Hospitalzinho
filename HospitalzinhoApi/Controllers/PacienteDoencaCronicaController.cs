using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteDoencaCronicaController : CrudControllerBase<PacienteDoencaCronica>
    {
        PacienteDoencaCronicaServico _servico;
        public PacienteDoencaCronicaController(PacienteDoencaCronicaServico servico) : base(servico) 
        { 
            _servico = servico; 
        }
    }
}
