using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteConsultaController : CrudControllerBase<PacienteConsulta>
    {
        PacienteConsultaServico _servico;
        public PacienteConsultaController(PacienteConsultaServico servico) : base(servico) 
        { 
            _servico = servico; 
        }
    }
}
