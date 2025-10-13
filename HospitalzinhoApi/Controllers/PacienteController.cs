using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteController : CrudControllerBase<Paciente>
    {
        PacienteServico _servico;
        public PacienteController(PacienteServico servico) : base(servico)
        {
            _servico = servico;
        }
    }
}
