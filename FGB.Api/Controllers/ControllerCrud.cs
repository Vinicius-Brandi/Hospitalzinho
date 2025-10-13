using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using FGB.Entidades;
using FGB.Servicos;

namespace FGB.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class CrudControllerBase<T> : ControllerBase
    where T : EntidadeBase
    {
        protected readonly ServicoCrud<T> _servico;

        protected CrudControllerBase(ServicoCrud<T> servico)
        {
            _servico = servico;
        }

        [HttpGet]
        [EnableQuery] // permite usar OData (ex: $filter, $top, $skip, etc.)
        public virtual IActionResult GetOData()
        {
            var lista = _servico.Consulta(); // ou o método que retorna IQueryable<T>
            return Ok(lista);
        }

        [HttpGet("{id:long}")]
        public virtual IActionResult GetById(long id)
        {
            var entidade = _servico.Retorna(id);
            return entidade == null
                ? NotFound(new { mensagem = $"{typeof(T).Name} não encontrado." })
                : Ok(entidade);
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
}