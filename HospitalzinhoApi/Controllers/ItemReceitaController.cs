using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class ItemReceitaController : CrudControllerBase<ItemReceita, ItemReceita>
    {
        ItemReceitaServico _servico;
        public ItemReceitaController(ItemReceitaServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
