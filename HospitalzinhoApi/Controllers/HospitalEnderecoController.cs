using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class HospitalEnderecoController : CrudControllerBase<HospitalEndereco>
    {
        HospitalEnderecoServico _servico;
        public HospitalEnderecoController(HospitalEnderecoServico servico) : base(servico) 
        { 
            _servico = servico; 
        }
    }
}
