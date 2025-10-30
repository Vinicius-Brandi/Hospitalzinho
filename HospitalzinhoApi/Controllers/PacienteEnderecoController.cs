using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    //Certo
    public class PacienteEnderecoController : CrudControllerBase<PacienteEndereco, PacienteEnderecoDto>
    {
        PacienteEnderecoServico _servico;
        public PacienteEnderecoController(PacienteEnderecoServico servico, IMapper mapper) : base(servico, mapper) 
        { 
            _servico = servico; 
        }
    }
}
