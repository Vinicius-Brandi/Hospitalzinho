using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteInternacaoController : CrudControllerBase<PacienteInternacao>
    {
        PacienteInternacaoServico _servico;
        public PacienteInternacaoController(PacienteInternacaoServico servico) : base(servico) 
        {
            _servico = servico;
        }
    }
}
