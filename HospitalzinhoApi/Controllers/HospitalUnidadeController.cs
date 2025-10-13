using Hospitalzinho.Entidades.EspecificaçõesHospital;   
using FGB.Api.Controllers;
using Hospitalzinho.Servico;
namespace HospitalzinhoApi.Controllers
{
    public class HospitalUnidadeController : CrudControllerBase<HospitalUnidade>
    {
        HospitalUnidadeServico _servico;
        public HospitalUnidadeController(HospitalUnidadeServico servico) : base(servico)
        {
            _servico = servico;
        }
    }
}
