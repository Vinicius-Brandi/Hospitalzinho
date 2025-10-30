using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    //Certo
    public class ItemReceitaController : CrudControllerBase<ItemReceita, ItemReceitaDto>
    {
        ItemReceitaServico _servico;
        public ItemReceitaController(ItemReceitaServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
