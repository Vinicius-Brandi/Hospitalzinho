using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteEnderecoController : CrudControllerBase<PacienteEndereco>
    {
        PacienteEnderecoServico _servico;
        public PacienteEnderecoController(PacienteEnderecoServico servico) : base(servico) 
        { 
            _servico = servico; 
        }
    }
}
