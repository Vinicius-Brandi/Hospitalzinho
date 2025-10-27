using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class MedicamentoController : CrudControllerBase<Medicamento, Medicamento>
    {
        MedicamentoServico _servico;
        public MedicamentoController(MedicamentoServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
