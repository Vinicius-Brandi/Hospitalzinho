using HospitalzinhoAPI.DTO.Hospital.Prontuario;
using HospitalzinhoAPI.Models.Hospital.Paciente;
using HospitalzinhoAPI.Models.Hospital.Prontuario;
using HospitalzinhoAPI.Services.Prontuario;
using Microsoft.AspNetCore.Mvc;

namespace HospitalzinhoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProntuarioController : ControllerBase
    {
        private readonly IProntuarioInterface _prontuarioInterface;

        public ProntuarioController(IProntuarioInterface prontuarioInterface)
        {
            _prontuarioInterface = prontuarioInterface;
        }

        [HttpGet("BuscarProntuarioAlergias/{cpfPaciente}")]
        public async Task<ActionResult<List<ProntuarioAlergiaDTO>>> BuscarProntuarioAlergias(string cpfPaciente)
        {
            var response = await _prontuarioInterface.BuscarProntuarioAlergias(cpfPaciente);
            return Ok(response);
        }

        [HttpGet("BuscarProntuarioVacinas/{cpfPaciente}")]
        public async Task<ActionResult<List<ProntuarioVacinaDTO>>> BuscarProntuarioVacinas(string cpfPaciente)
        {
            var response = await _prontuarioInterface.BuscarProntuarioVacinas(cpfPaciente);
            return Ok(response);
        }

        [HttpGet("BuscarProntuarioConsultas/{cpfPaciente}")]
        public async Task<ActionResult<List<ProntuarioConsulta>>> BuscarProntuarioConsultas(string cpfPaciente)
        {
            var response = await _prontuarioInterface.BuscarProntuarioConsultas(cpfPaciente);
            return Ok(response);
        }

        [HttpGet("BuscarProntuarioInternacoes/{cpfPaciente}")]
        public async Task<ActionResult<List<ProntuarioInternacaoDTO>>> BuscarProntuarioInternacoes(string cpfPaciente)
        {
            var response = await _prontuarioInterface.BuscarProntuarioInternacoes(cpfPaciente);
            return Ok(response);
        }

        [HttpPost("AdicionarProntuarioAlergia/{cpfPaciente}")]
        public async Task<ActionResult<ProntuarioAlergiaDTO>> AdicionarProntuarioAlergia(string cpfPaciente, ProntuarioAlergiaDTO prontuarioAlergia)
        {
            var response = await _prontuarioInterface.AdicionarProntuarioAlergia(cpfPaciente, prontuarioAlergia);
            return Ok(response);
        }

        [HttpPost("AdicionarProntuarioConsulta/{cpfPaciente}")]
        public async Task<ActionResult<ProntuarioConsulta>> AdicionarProntuarioConsulta(string cpfPaciente, ProntuarioConsultaDTO prontuarioConsulta)
        {
            var response = await _prontuarioInterface.AdicionarProntuarioConsulta(cpfPaciente, prontuarioConsulta);
            return Ok(response);
        }

        [HttpPost("AdicionarProntuarioInternacao/{cpfPaciente}")]
        public async Task<ActionResult<ProntuarioConsulta>> AdicionarProntuarioInternacao(string cpfPaciente, ProntuarioInternacaoDTO prontuarioInternacao)
        {
            var response = await _prontuarioInterface.AdicionarProntuarioInternacao(cpfPaciente, prontuarioInternacao);
            return Ok(response);
        }

        [HttpPost("AdicionarProntuarioVacina/{cpfPaciente}")]
        public async Task<ActionResult<ProntuarioConsulta>> AdicionarProntuarioVacina(string cpfPaciente, ProntuarioVacinaDTO prontuarioVacina)
        {
            var response = await _prontuarioInterface.AdicionarProntuarioVacina(cpfPaciente, prontuarioVacina);
            return Ok(response);
        }

    }
}
