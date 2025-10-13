using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteProntuarioController : CrudControllerBase<PacienteProntuario>
    {
        PacienteProntuarioServico _servico;
        public PacienteProntuarioController(PacienteProntuarioServico servico) : base(servico)
        {
            _servico = servico;
        }
    }
}
