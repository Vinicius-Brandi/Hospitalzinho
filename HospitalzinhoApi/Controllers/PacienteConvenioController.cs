using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteConvenioController : CrudControllerBase<PacienteConvenio>
    {
        PacienteConvenioServico _servico;
        public PacienteConvenioController(PacienteConvenioServico servico) : base(servico) 
        { 
            _servico = servico; 
        }
    }
}
