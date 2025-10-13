using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class MedicamentoModeloController : CrudControllerBase<MedicamentoModelo>
    {
        MedicamentoModeloServico _servico;
        public MedicamentoModeloController(MedicamentoModeloServico servico) : base(servico)
        {
            _servico = servico;
        }
    }
}
