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

        [HttpGet("BuscarProntuarioAlergias/{idPaciente}")]
        public async Task<ActionResult<List<ProntuarioAlergiaDTO>>> BuscarProntuarioAlergias(int idPaciente)
        {
            var response = await _prontuarioInterface.BuscarProntuarioAlergias(idPaciente);
            return Ok(response);
        }

        [HttpGet("BuscarProntuarioVacinas/{idPaciente}")]
        public async Task<ActionResult<List<ProntuarioVacinaDTO>>> BuscarProntuarioVacinas(int idPaciente)
        {
            var response = await _prontuarioInterface.BuscarProntuarioVacinas(idPaciente);
            return Ok(response);
        }

        [HttpGet("BuscarProntuarioConsultas/{idPaciente}")]
        public async Task<ActionResult<List<ProntuarioConsulta>>> BuscarProntuarioConsultas(int idPaciente)
        {
            var response = await _prontuarioInterface.BuscarProntuarioConsultas(idPaciente);
            return Ok(response);
        }

        [HttpGet("BuscarProntuarioInternacoes/{idPaciente}")]
        public async Task<ActionResult<List<ProntuarioInternacaoDTO>>> BuscarProntuarioInternacoes(int idPaciente)
        {
            var response = await _prontuarioInterface.BuscarProntuarioInternacoes(idPaciente);
            return Ok(response);
        }

        [HttpPost("AdicionarProntuarioAlergia/{idPaciente}")]
        public async Task<ActionResult<ProntuarioAlergiaDTO>> AdicionarProntuarioAlergia(int idPaciente, ProntuarioAlergiaDTO prontuarioAlergia)
        {
            var response = await _prontuarioInterface.AdicionarProntuarioAlergia(idPaciente, prontuarioAlergia);
            return Ok(response);
        }

        [HttpPost("AdicionarProntuarioConsulta/{idPaciente}")]
        public async Task<ActionResult<ProntuarioConsulta>> AdicionarProntuarioConsulta(int idPaciente, ProntuarioConsultaDTO prontuarioConsulta)
        {
            var response = await _prontuarioInterface.AdicionarProntuarioConsulta(idPaciente, prontuarioConsulta);
            return Ok(response);
        }

        [HttpPost("AdicionarProntuarioInternacao/{idPaciente}")]
        public async Task<ActionResult<ProntuarioConsulta>> AdicionarProntuarioInternacao(int idPaciente, ProntuarioInternacaoDTO prontuarioInternacao)
        {
            var response = await _prontuarioInterface.AdicionarProntuarioInternacao(idPaciente, prontuarioInternacao);
            return Ok(response);
        }

        [HttpPost("AdicionarProntuarioVacina/{idPaciente}")]
        public async Task<ActionResult<ProntuarioConsulta>> AdicionarProntuarioVacina(int idPaciente, ProntuarioVacinaDTO prontuarioVacina)
        {
            var response = await _prontuarioInterface.AdicionarProntuarioVacina(idPaciente, prontuarioVacina);
            return Ok(response);
        }

    }
}
