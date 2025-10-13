using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class ItemReceitaController : CrudControllerBase<ItemReceita>
    {
        ItemReceitaServico _servico;
        public ItemReceitaController(ItemReceitaServico servico) : base(servico)
        {
            _servico = servico;
        }
    }
}
