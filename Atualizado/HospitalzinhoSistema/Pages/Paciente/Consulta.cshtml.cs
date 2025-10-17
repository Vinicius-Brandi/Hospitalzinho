using HospitalzinhoSistema.Services;
using Htmx;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HospitalzinhoSistema.Pages.Paciente
{
    public class ConsultaModel : PageModel
    {
        private readonly PacienteAPIService _pacienteAPIService;
        [BindProperty(SupportsGet = true)]
        public string? SearchTerm { get; set; }

        public ConsultaModel(PacienteAPIService pacienteAPIService)
        {
            _pacienteAPIService = pacienteAPIService;
        }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnGetBuscarSugestoesAsync()
        {
            var sugestoes = await _pacienteAPIService.GetSugestoesPorCPFAsync(SearchTerm);


            if (string.IsNullOrWhiteSpace(SearchTerm) || sugestoes != null && sugestoes.Count == 0)
            {
                return Content("");
            }

            return Partial("PartialHTML/_SugestoesCPF", sugestoes);
        }

        public async Task<IActionResult> OnGetSelecionarAsync(string cpf)
        {
            var listaPacientes = await _pacienteAPIService.GetSugestoesPorCPFAsync(cpf);

            var pacienteEncontrado = listaPacientes?.FirstOrDefault();

            if (pacienteEncontrado == null)
            {
                return Content("<div class='alerta-erro'>Paciente não encontrado. Por favor, tente novamente.</div>");
            }

            return Partial("PartialHTML/_DetalhesPaciente", pacienteEncontrado);
        }

    }
}
