using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteCirurgiaController : CrudControllerBase<PacienteCirurgia, PacienteCirurgia>
    {
        PacienteCirurgiaServico _servico;
        public PacienteCirurgiaController(PacienteCirurgiaServico servico, IMapper mapper) : base(servico, mapper) 
        { 
            _servico = servico; 
        }
    }
}
