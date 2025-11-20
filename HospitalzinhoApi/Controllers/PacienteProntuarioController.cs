using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.DTO.Get;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using NHibernate;
using System.Linq;

namespace HospitalzinhoApi.Controllers
{
    public class PacienteProntuarioController : CrudControllerBase<PacienteProntuario, ProntuarioDto>
    {
        //Certo
        private readonly PacienteProntuarioServico _servico;
        public PacienteProntuarioController(PacienteProntuarioServico servico, IMapper mapper)
            : base(servico, mapper)
        {
            _servico = servico;
        }

        [HttpGet]
        [EnableQuery]
        public override IActionResult GetOData()
        {
            var lista = _servico.Consulta().ToList();

            foreach (var pront in lista)
            {
                NHibernateUtil.Initialize(pront.Paciente);
                NHibernateUtil.Initialize(pront.DoencasCronicas);
                NHibernateUtil.Initialize(pront.MedicacoesContinuas);
                NHibernateUtil.Initialize(pront.Cirurgias);
                NHibernateUtil.Initialize(pront.Vacinacoes);
                NHibernateUtil.Initialize(pront.Alergias);
                NHibernateUtil.Initialize(pront.Consultas);
                NHibernateUtil.Initialize(pront.Internacoes);
                NHibernateUtil.Initialize(pront.Exames);
            }

            var listaDto = lista.Select(p => _mapper.Map<ProntuarioDto>(p));
            return Ok(listaDto);
        }

        [HttpGet("{id:long}")]
        public override IActionResult GetById(long id)
        {
            var pront = _servico.Retorna(id);
            if (pront == null)
                return NotFound(new { mensagem = "Prontuário não encontrado." });

            NHibernateUtil.Initialize(pront.Paciente);
            NHibernateUtil.Initialize(pront.DoencasCronicas);
            NHibernateUtil.Initialize(pront.MedicacoesContinuas);
            NHibernateUtil.Initialize(pront.Cirurgias);
            NHibernateUtil.Initialize(pront.Vacinacoes);
            NHibernateUtil.Initialize(pront.Consultas);
            NHibernateUtil.Initialize(pront.Internacoes);
            NHibernateUtil.Initialize(pront.Exames);

            var dto = _mapper.Map<ProntuarioDto>(pront);
            return Ok(dto);
        }
    }
}
