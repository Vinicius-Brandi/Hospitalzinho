using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.DTO.Post;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteController : CrudControllerBase<Paciente, PacienteDto>
    {
        private readonly PacienteServico _servico;
        private readonly IMapper _mapper;

        public PacienteController(PacienteServico servico, IMapper mapper)
            : base(servico, mapper)
        {
            _servico = servico;
            _mapper = mapper;
        }

        [HttpPost("cadastro")]
        public async Task<IActionResult> Cadastro([FromBody] PacientePostDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var paciente = await _servico.Cadastro(dto);

            if (paciente == null)
            {
                var erros = _servico.Mensagens
                    .Select(m => new { mensagem = m })
                    .ToArray();

                return UnprocessableEntity(erros);
            }

            var pacienteDto = _mapper.Map<PacienteDto>(paciente);
            return CreatedAtAction(nameof(GetById), new { id = paciente.Id }, pacienteDto);
        }

        [HttpPut("atualiza")]
            public async Task<IActionResult> Atualiza([FromBody] PacientePostDto dto)
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var paciente = await _servico.Editar(dto);
                if (paciente == null)
                {
                    var erros = _servico.Mensagens
                        .Select(m => new { mensagem = m })
                        .ToArray();
                    return UnprocessableEntity(erros);
                }
                var pacienteDto = _mapper.Map<PacienteDto>(paciente);
                return Ok(pacienteDto);
            }
    }
}
