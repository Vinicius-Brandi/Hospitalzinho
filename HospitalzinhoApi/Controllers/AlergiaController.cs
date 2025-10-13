using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class AlergiaController : CrudControllerBase<Alergia>
    {
        AlergiaServico _servico;
        public AlergiaController(AlergiaServico servico) : base(servico) 
        { 
            _servico = servico; 
        }
    }
}
