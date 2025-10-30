using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    //Certo
    public class AlergiaController : CrudControllerBase<Alergia, Alergia>
    {
        AlergiaServico _servico;
        public AlergiaController(AlergiaServico servico, IMapper mapper) : base(servico, mapper) 
        { 
            _servico = servico; 
        }
    }
}
