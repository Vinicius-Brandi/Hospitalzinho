using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;
using Hospitalzinho.DTO.Get;

namespace HospitalzinhoApi.Controllers
{
    public class HospitalEnderecoController : CrudControllerBase<HospitalEndereco, HospitalEnderecoDto>
    {
        HospitalEnderecoServico _servico;
        public HospitalEnderecoController(HospitalEnderecoServico servico, IMapper mapper) : base(servico, mapper) 
        { 
            _servico = servico; 
        }
    }
}
