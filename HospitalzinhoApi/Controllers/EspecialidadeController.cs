using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    //Certo
    public class EspecialidadeController : CrudControllerBase<Especialidade, EspecialidadeDto>
    {
        EspecialidadeServico _servico;
        public EspecialidadeController(EspecialidadeServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
