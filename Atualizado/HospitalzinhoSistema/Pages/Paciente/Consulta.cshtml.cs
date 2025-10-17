using HospitalzinhoSistema.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HospitalzinhoSistema.Pages.Paciente
{
    public class ConsultaModel : PageModel
    {
        private readonly PacienteAPIService _pacienteAPIService;
        [BindProperty(SupportsGet = true)]
        public string SearchTerm { get; set; }

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
            Console.WriteLine("teste");

            return Partial("_SugestoesCPF", sugestoes);
        }

    }
}
