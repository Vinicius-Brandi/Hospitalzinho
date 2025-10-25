using HospitalzinhoSistema.Models;
using HospitalzinhoSistema.Models.Paciente;
using HospitalzinhoSistema.Services;
using Htmx;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HospitalzinhoSistema.Pages.Paciente
{
    public class ConsultaModel : PageModel
    {
        private readonly APIService _pacienteAPIService;
        [BindProperty(SupportsGet = true)]
        public string? SearchTerm { get; set; }

        public ConsultaModel(APIService pacienteAPIService)
        {
            _pacienteAPIService = pacienteAPIService;
        }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnGetBuscarSugestoesAsync()
        {
            var viewModel = await _pacienteAPIService.GetBuscarSugestoesAsync(SearchTerm ?? string.Empty, "Consulta", "Selecionar");

            return Partial("_SugestoesCPF", viewModel);
        }

        public async Task<IActionResult> OnGetSelecionarAsync(string cpf)
        {
            var pacienteEncontrado = await _pacienteAPIService.GetPaciente(cpf);

            if (pacienteEncontrado == null)
            {
                return Content("<div class='alerta-erro'>Paciente n�o encontrado. Por favor, tente novamente.</div>");
            }

            return Partial("_DetalhesPaciente", pacienteEncontrado);
        }

    }
}
