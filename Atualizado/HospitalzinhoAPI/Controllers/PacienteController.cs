using HospitalzinhoAPI.DTO.Paciente;
using HospitalzinhoAPI.Models;
using HospitalzinhoAPI.Models.Hospital.Paciente;
using HospitalzinhoAPI.Services.Paciente;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HospitalzinhoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PacienteController : ControllerBase
    {
        
        private readonly IPacienteInterface _pacienteInterface;

        public PacienteController(IPacienteInterface pacienteInterface)
        {
            _pacienteInterface = pacienteInterface;
        }

        [HttpGet("BuscarTodosPacientes")]
        public async Task<ActionResult<List<PacienteDTO>?>> BuscarTodosPacientes()
        {
            var response = await _pacienteInterface.BuscarTodosPacientes();
            return Ok(response);
        }

        [HttpGet("BuscarPacientePorCPF/{CPF}")]
        public async Task<ActionResult<List<PacienteDTO>?>> BuscarPacientePorCPF(string CPF)
        {
            var response = await _pacienteInterface.BuscarPacientePorCPF(CPF);
            return Ok(response);
        }

        [HttpPost("CadastrarPaciente")]
        public async Task<ActionResult<PacienteDTO>> CadastrarPaciente(PacienteDTO paciente)
        {
            var response = await _pacienteInterface.CadastrarPaciente(paciente);
            return Ok(response);
        }
    }
}
