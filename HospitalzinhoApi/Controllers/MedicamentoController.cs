using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class MedicamentoController : CrudControllerBase<Medicamento>
    {
        MedicamentoServico _servico;
        public MedicamentoController(MedicamentoServico servico) : base(servico)
        {
            _servico = servico;
        }
    }
}
