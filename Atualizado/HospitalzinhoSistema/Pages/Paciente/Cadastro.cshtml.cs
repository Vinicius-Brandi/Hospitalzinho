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

        private readonly PacienteAPIService _pacienteAPIService;

        public CadastroModel(PacienteAPIService pacienteAPIService)
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

            return RedirectToPage("/Paciente/Consulta", new { status = "sucesso" });
        }
    }
}
