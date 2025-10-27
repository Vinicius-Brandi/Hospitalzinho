using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class MedicamentoModeloController : CrudControllerBase<MedicamentoModelo, MedicamentoModelo>
    {
        MedicamentoModeloServico _servico;
        public MedicamentoModeloController(MedicamentoModeloServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
