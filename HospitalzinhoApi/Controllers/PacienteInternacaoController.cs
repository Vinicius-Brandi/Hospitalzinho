using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    //Certo
    public class PacienteInternacaoController : CrudControllerBase<PacienteInternacao, InternacaoDto>
    {
        PacienteInternacaoServico _servico;
        public PacienteInternacaoController(PacienteInternacaoServico servico, IMapper mapper) : base(servico, mapper) 
        {
            _servico = servico;
        }
    }
}
