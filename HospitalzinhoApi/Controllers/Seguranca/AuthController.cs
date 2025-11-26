using FGB.IRepositorios;
using Hospitalzinho.Entidades;
using Hospitalzinho.Seguranca;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace HospitalzinhoApi.Controllers.Seguranca
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IRepositorioSessao _session;
        private readonly JwtService _jwt;

        public AuthController(IRepositorioSessao session, JwtService jwt)
        {
            _session = session;
            _jwt = jwt;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] string tokenAcesso)
        {
            var hospital = _session.GetRepositorioConsulta().Consulta<Hospital>().FirstOrDefault(h => h.TokenAcesso == tokenAcesso);

            if (hospital == null)
                return Unauthorized("Token de acesso inválido.");

            var jwt = _jwt.GerarToken(hospital);

            return Ok(new
            {
                token = jwt,
                hospitalId = hospital.Id,
                nome = hospital.Nome
            });
        }
    }

}
