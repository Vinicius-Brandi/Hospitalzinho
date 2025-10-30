using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    //Certo
    public class PacienteController : CrudControllerBase<Paciente, PacienteDto>
    {
        PacienteServico _servico;
        public PacienteController(PacienteServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
