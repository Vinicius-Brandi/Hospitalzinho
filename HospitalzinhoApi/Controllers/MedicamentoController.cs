using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    //Certo
    public class MedicamentoController : CrudControllerBase<Medicamento, MedicamentoDto>
    {
        MedicamentoServico _servico;
        public MedicamentoController(MedicamentoServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
