using Microsoft.AspNetCore.Mvc;
using MinisterioDaSaudeMVC.Models;
using MinisterioDaSaudeMVC.Services;

namespace MinisterioDaSaudeMVC.Controllers
{
    public class HospitalController : Controller
    {

        private readonly HospitalAPIService _hospitalAPIService;

        public HospitalController(HospitalAPIService hospitalAPIService)
        {
            _hospitalAPIService = hospitalAPIService;
        }

        [HttpGet]
        public IActionResult Cadastro()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Cadastro(string nomenomeHospital, string cnesHospital, string cnpjHospital, string tipoUnidade, string cep, string cidade, string bairro, string rua, string numero, string complemento)
        {
            HospitalUnidade hospital = new HospitalUnidade()
            {
                Nome = nomenomeHospital,
                TipoUnidade = (TipoUnidade)Enum.Parse(typeof(TipoUnidade), tipoUnidade),
                Endereco = new HospitalEndereco()
                {
                    Rua = rua,
                    Numero = numero,
                    Bairro = bairro,
                    Cidade = cidade,
                    CEP = cep,
                    Complemento = complemento
                },
                InstituicaoPai = new Hospital()
                {
                    Nome = nomenomeHospital,
                    CNES = cnesHospital,
                    CNPJ = cnpjHospital,
                    TokenAcesso = Guid.NewGuid().ToString()
                }
            };

            var hospitaoUnidadeCriado = await _hospitalAPIService.CreatePacienteAsync(hospital);

            if (hospital != null)
            {
                return RedirectToAction("Index", "Home");
            }

            return View();
        }

        public IActionResult Consulta()
        {
            return View();
        }
    }
}
