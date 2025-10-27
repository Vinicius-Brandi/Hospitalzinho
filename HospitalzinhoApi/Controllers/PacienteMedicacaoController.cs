using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteMedicacaoController : CrudControllerBase<PacienteMedicacao, PacienteMedicacao>
    {
        PacienteMedicacaoServico _servico;
        public PacienteMedicacaoController(PacienteMedicacaoServico servico, IMapper mapper) : base(servico, mapper)
        { 
            _servico = servico;
        }
    }
}
