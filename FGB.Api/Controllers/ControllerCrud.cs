using FGB.Entidades;
using FGB.Servicos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace FGB.Api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public abstract class CrudControllerBase<T, TDto> : ControllerBase
        where T : EntidadeBase
    {
        protected readonly ServicoCrud<T> _servico;
        protected readonly IMapper _mapper;

        protected CrudControllerBase(ServicoCrud<T> servico, IMapper mapper)
        {
            _servico = servico;
            _mapper = mapper;
        }

        [HttpGet]
        [EnableQuery] // suporte a OData ($filter, $top, $skip, etc.)
        public virtual IActionResult GetOData()
        {
            var listaDto = _servico.Consulta()
                .ProjectTo<TDto>(_mapper.ConfigurationProvider); // converte direto no banco

            return Ok(listaDto);
        }

        [HttpGet("{id:long}")]
        public virtual IActionResult GetById(long id)
        {
            var entity = _servico.Retorna(id);
            if (entity == null)
                return NotFound(new { mensagem = $"{typeof(T).Name} não encontrado." });

            var dto = _mapper.Map<TDto>(entity); // AutoMapper faz o mapeamento
            return Ok(dto);
        }

        [HttpPost]
        public virtual IActionResult Post([FromBody] T entidade)
        {
            if (_servico.Inclui(entidade))
                return Ok(new { mensagem = $"{typeof(T).Name} cadastrado com sucesso.", entidade });

            return UnprocessableEntity(_servico.Mensagens);
        }

        [HttpPut("{id:long}")]
        public virtual IActionResult Put(long id, [FromBody] T entidade)
        {
            entidade.Id = id;
            var atualizado = _servico.Merge(entidade);
            if (atualizado != null)
                return Ok(new { mensagem = $"{typeof(T).Name} atualizado com sucesso.", entidade });

            return UnprocessableEntity(_servico.Mensagens);
        }

        [HttpDelete("{id:long}")]
        public virtual IActionResult Delete(long id)
        {
            var removido = _servico.Exclui(id);
            if (removido != null)
                return Ok(new { mensagem = $"{typeof(T).Name} excluído com sucesso." });

            return UnprocessableEntity(_servico.Mensagens);
        }
    }
};
