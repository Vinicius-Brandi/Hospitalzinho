using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class ReceitaController : CrudControllerBase<Receita>
    {
        ReceitaServico _servico;
        public ReceitaController(ReceitaServico servico) : base(servico)
        {
            _servico = servico;
        }
    }
}
