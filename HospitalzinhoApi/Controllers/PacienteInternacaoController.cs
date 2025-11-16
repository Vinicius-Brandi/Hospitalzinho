using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;
using Microsoft.AspNetCore.Mvc;

namespace HospitalzinhoApi.Controllers
{
    //Certo
    public class PacienteInternacaoController : CrudControllerBase<PacienteInternacao, InternacaoDto>
    {
        PacienteInternacaoServico _servico;
        LeitoServico _servicoleito;
        public PacienteInternacaoController(PacienteInternacaoServico servico, LeitoServico servicoleito, IMapper mapper) : base(servico, mapper) 
        {
            _servico = servico;
            _servicoleito = servicoleito;
        }

        public override IActionResult Post([FromBody] PacienteInternacao entidade)
        {
            var leito = _servicoleito.Retorna(entidade.LeitoId);
            var QuartoId = leito.QuartoId;
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (_servico.Inclui(entidade))
                return Ok(new { mensagem = $"Internação do Paciente cadastrada com sucesso.", entidade });

            return UnprocessableEntity(_servico.Mensagens);
        }


        [HttpPut("{id:long}")]
        public override IActionResult Put(long id, [FromBody] PacienteInternacao entidade)
        {
            var leito = _servicoleito.Retorna(entidade.LeitoId);
            var QuartoId = leito.QuartoId;
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            entidade.Id = id;

            var atualizado = _servico.Merge(entidade);
            if (atualizado != null)
                return Ok(new { mensagem = $"Internação do Paciente atualizada com sucesso.", entidade });

            return UnprocessableEntity(_servico.Mensagens);
        }

    }
}
