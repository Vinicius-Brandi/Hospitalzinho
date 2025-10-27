using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;   
using Hospitalzinho.Servico;
namespace HospitalzinhoApi.Controllers
{
    public class HospitalUnidadeController : CrudControllerBase<HospitalUnidade, HospitalUnidade>
    {
        HospitalUnidadeServico _servico;
        public HospitalUnidadeController(HospitalUnidadeServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }
    }
}
