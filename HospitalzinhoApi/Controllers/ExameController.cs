using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class ExameController : CrudControllerBase<Exame>
    {
        ExameServico _servico;
        public ExameController(ExameServico servico) : base(servico) 
        { 
            _servico = servico;
        }
    }
}
