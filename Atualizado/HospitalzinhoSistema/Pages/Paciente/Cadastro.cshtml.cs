using HospitalzinhoSistema.Models.Paciente;
using HospitalzinhoSistema.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HospitalzinhoSistema.Pages.Paciente
{
    public class CadastroModel : PageModel
    {
        [BindProperty]
        public PacienteDTO Paciente { get; set; } = new();

        private readonly APIService _pacienteAPIService;

        public CadastroModel(APIService pacienteAPIService)
        {
            _pacienteAPIService = pacienteAPIService;
        }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            await _pacienteAPIService.CreatePacienteAsync(Paciente);

            return RedirectToPage("/Paciente/Consulta", new { status = "sucesso" });
        }
    }
}
