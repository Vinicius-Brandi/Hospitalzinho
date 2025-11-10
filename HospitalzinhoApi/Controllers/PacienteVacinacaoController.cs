using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteVacinacaoController : CrudControllerBase<PacienteVacinacao, VacinacaoDto>
    {
        PacienteVacinacaoServico _servico;
        public PacienteVacinacaoController(PacienteVacinacaoServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
