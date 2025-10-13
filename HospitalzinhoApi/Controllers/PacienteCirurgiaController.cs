using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteCirurgiaController : CrudControllerBase<PacienteCirurgia>
    {
        PacienteCirurgiaServico _servico;
        public PacienteCirurgiaController(PacienteCirurgiaServico servico) : base(servico) 
        { 
            _servico = servico; 
        }
    }
}
