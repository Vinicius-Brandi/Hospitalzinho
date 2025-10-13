using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class AlaController : CrudControllerBase<Ala>
    {
        AlaServico _servico;
        public AlaController(AlaServico servico) : base(servico)
        {
            _servico = servico;
        }
    }
}
