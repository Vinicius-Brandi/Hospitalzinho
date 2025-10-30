using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using NHibernate;

namespace HospitalzinhoApi.Controllers
{
    //Certo
    public class ProfissionalSaudeController : CrudControllerBase<ProfissionalSaude, ProfissionalDto>
    {
        private readonly ProfissionalSaudeServico _servico;

        public ProfissionalSaudeController(ProfissionalSaudeServico servico, IMapper mapper)
            : base(servico, mapper)
        {
            _servico = servico;
        }

        [HttpGet]
        [EnableQuery]
        public override IActionResult GetOData()
        {
            var lista = _servico.Consulta().ToList();

            foreach (var prof in lista)
            {
                NHibernateUtil.Initialize(prof.Consultas);
                NHibernateUtil.Initialize(prof.Internacoes);
                NHibernateUtil.Initialize(prof.Cirurgias);
                NHibernateUtil.Initialize(prof.ExamesSolicitados);
                NHibernateUtil.Initialize(prof.VacinacoesAdministradas);
                NHibernateUtil.Initialize(prof.ReceitasPrescritas);
            }

            var listaDto = lista.Select(p => _mapper.Map<ProfissionalDto>(p));
            return Ok(listaDto);
        }

        [HttpGet("{id:long}")]
        public override IActionResult GetById(long id)
        {
            var prof = _servico.Retorna(id);
            if (prof == null)
                return NotFound(new { mensagem = "Profissional não encontrado." });

            // Carrega as coleções antes de mapear
            NHibernateUtil.Initialize(prof.Consultas);
            NHibernateUtil.Initialize(prof.Internacoes);
            NHibernateUtil.Initialize(prof.Cirurgias);
            NHibernateUtil.Initialize(prof.ExamesSolicitados);
            NHibernateUtil.Initialize(prof.VacinacoesAdministradas);
            NHibernateUtil.Initialize(prof.ReceitasPrescritas);

            // Mapeia para o DTO
            var dto = _mapper.Map<ProfissionalDto>(prof);
            return Ok(dto);
        }
    }
}
