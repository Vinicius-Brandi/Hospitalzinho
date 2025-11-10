using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;   
using Hospitalzinho.Servico;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
namespace HospitalzinhoApi.Controllers
{
    //Certo
    public class HospitalUnidadeController : CrudControllerBase<HospitalUnidade, HospitalUnidadeDto>
    {
        HospitalUnidadeServico _servico;
        public HospitalUnidadeController(HospitalUnidadeServico servico, IMapper mapper) : base(servico, mapper)
        {
            _servico = servico;
        }

        [HttpPost("cadastro")]
        public async Task<IActionResult> Cadastro([FromBody] HospitalUnidade dto)
        {
            var unidadeSalva = await _servico.Cadastro(dto);
            if (_servico.Mensagens.Count > 0)
            {
                return BadRequest(new { mensagens = _servico.Mensagens });
            }
            var unidadeDto = _mapper.Map<HospitalUnidadeDto>(unidadeSalva);
            return CreatedAtAction(nameof(GetById), new { id = unidadeDto.Id }, unidadeDto);
        }
    }
}
