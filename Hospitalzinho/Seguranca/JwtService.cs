using Hospitalzinho.Entidades;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace Hospitalzinho.Seguranca
{
    public class JwtService
    {
        private readonly JwtSettings _settings;

        public JwtService(IOptions<JwtSettings> settings)
        {
            _settings = settings.Value;
        }

        public string GerarToken(Hospital hospital)
        {
            var claims = new[]
            {
            new Claim("hospitalId", hospital.Id.ToString()),
            new Claim("nome", hospital.Nome),
            new Claim("cnpj", hospital.CNPJ)
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _settings.Emissor,
                audience: _settings.Audiencia,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(_settings.ExpiracaoHoras),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
