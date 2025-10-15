using HospitalzinhoMVC.Models.BrandiAPI;
using HospitalzinhoMVC.Models.MinhaAPI;
using HospitalzinhoMVC.Services;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;
using System.Runtime.ConstrainedExecution;

namespace HospitalzinhoMVC.Controllers
{
    public class PacienteController : Controller
    {

        private readonly PacienteAPIService _pacienteAPIService;

        public PacienteController(PacienteAPIService pacienteAPIService)
        {
            _pacienteAPIService = pacienteAPIService;
        }

        [HttpGet]
        public IActionResult Cadastro()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Cadastro(Paciente model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var pacienteCriado = await _pacienteAPIService.CreatePacienteAsync(model);

            if (pacienteCriado != null)
            {
                return RedirectToAction("Index", "Home");
            }

            ModelState.AddModelError(string.Empty, "Ocorreu um erro ao salvar o paciente. Tente novamente.");
            return View(model);
        }

        [HttpGet]
        public IActionResult Consulta()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Consulta(string cpfPaciente)
        {
            if (String.IsNullOrWhiteSpace(cpfPaciente))
            {
                Console.WriteLine("CPF inválido ou vazio");
                return View();
            }

            cpfPaciente = cpfPaciente.Replace(".", "").Replace("-", "");

            if (cpfPaciente.Any(char.IsLetter))
            {
                Console.WriteLine("CPF não pode conter letras");
                return View();
            }

            return View();
        }
    }
}
    