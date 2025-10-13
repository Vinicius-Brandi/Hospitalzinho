using FGB.Api.Controllers;
using Hospitalzinho.Entidades.EspecificaçõesHospital;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class HospitalController : CrudControllerBase<Hospital>
    {
        HospitalServico _servico;
        public HospitalController(HospitalServico servico) : base(servico)
        {
            _servico = servico;
        }
    }
}
