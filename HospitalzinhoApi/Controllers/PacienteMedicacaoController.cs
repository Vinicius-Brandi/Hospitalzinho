using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteMedicacaoController : CrudControllerBase<PacienteMedicacao>
    {
        PacienteMedicacaoServico _servico;
        public PacienteMedicacaoController(PacienteMedicacaoServico servico) : base(servico)
        { 
            _servico = servico;
        }
    }
}
