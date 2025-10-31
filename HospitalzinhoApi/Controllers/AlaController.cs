using AutoMapper;
using FGB.Api.Controllers;
using Hospitalzinho.Entidades;
using Hospitalzinho.Servico;
using Hospitalzinho.DTO.Get;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using NHibernate;
using System.Linq;

namespace HospitalzinhoApi.Controllers
{
    public class AlaController : CrudControllerBase<Ala, AlaDto>
    {
        //Certo
        private readonly AlaServico _servico;
        public AlaController(AlaServico servico, IMapper mapper)
            : base(servico, mapper)
        {
            _servico = servico;
        }

        [HttpGet]
        [EnableQuery]
        public override IActionResult GetOData()
        {
            var alas = _servico.Consulta().ToList();

            foreach (var ala in alas)
            {
                NHibernateUtil.Initialize(ala.Hospital);
                NHibernateUtil.Initialize(ala.Quartos);
                NHibernateUtil.Initialize(ala.Salas);

                foreach (var quarto in ala.Quartos)
                {
                    NHibernateUtil.Initialize(quarto.Internacoes);
                }

                foreach (var sala in ala.Salas)
                {
                    NHibernateUtil.Initialize(sala.Consultas);
                }
            }

            var dto = alas.Select(a => _mapper.Map<AlaDto>(a));
            return Ok(dto);
        }

        [HttpGet("{id:long}")]
        public override IActionResult GetById(long id)
        {
            var ala = _servico.Retorna(id);
            if (ala == null)
                return NotFound(new { mensagem = "Ala não encontrada." });

            NHibernateUtil.Initialize(ala.Hospital);
            NHibernateUtil.Initialize(ala.Quartos);
            NHibernateUtil.Initialize(ala.Salas);

            foreach (var quarto in ala.Quartos)
            {
                NHibernateUtil.Initialize(quarto.Internacoes);
            }

            foreach (var sala in ala.Salas)
            {
                NHibernateUtil.Initialize(sala.Consultas);
            }

            var dto = _mapper.Map<AlaDto>(ala);
            return Ok(dto);
        }
    }
}
