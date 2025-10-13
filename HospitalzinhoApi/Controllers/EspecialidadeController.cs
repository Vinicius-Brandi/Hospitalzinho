using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class EspecialidadeController : CrudControllerBase<Especialidade>
    {
        EspecialidadeServico _servico;
        public EspecialidadeController(EspecialidadeServico servico) : base(servico)
        {
            _servico = servico;
        }
    }
}
