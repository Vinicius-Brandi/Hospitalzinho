using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteController : CrudControllerBase<Paciente, Paciente>
    {
        PacienteServico _servico;
        public PacienteController(PacienteServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
