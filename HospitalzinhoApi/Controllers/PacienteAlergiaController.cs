using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    //Certo
    public class PacienteAlergiaController : CrudControllerBase<PacienteAlergia, PacienteAlergia>
    {
        PacienteAlergiaServico _servico;
        public PacienteAlergiaController(PacienteAlergiaServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
