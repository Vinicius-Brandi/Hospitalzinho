using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class EspecialidadeController : CrudControllerBase<Especialidade, Especialidade>
    {
        EspecialidadeServico _servico;
        public EspecialidadeController(EspecialidadeServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
