using HospitalzinhoSistema.Models;
using HospitalzinhoSistema.Models.Paciente;
using HospitalzinhoSistema.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HospitalzinhoSistema.Pages.Prontuario
{
    public class CadastroModel : PageModel
    {

        private readonly APIService _pacienteAPIService;

        public CadastroModel(APIService pacienteAPIService)
        {
            _pacienteAPIService = pacienteAPIService;
        }

        [BindProperty(SupportsGet = true)]
        public string? SearchTerm { get; set; }

        public async Task<IActionResult> OnGetBuscarSugestoesAsync()
        {
            var viewModel = await _pacienteAPIService.GetBuscarSugestoesAsync(SearchTerm ?? string.Empty, "/Prontuario/Cadastro", "Selecionar");

            return Partial("_SugestoesCPF", viewModel);
        }

        public async Task<IActionResult> OnGetSelecionarAsync(string cpf)
        {
            var listaPacientes = await _pacienteAPIService.GetSugestoesPorCPFAsync(cpf);

            var pacienteEncontrado = listaPacientes?.FirstOrDefault();

            if (pacienteEncontrado == null)
            {
                return Content("<div class='alerta-erro'>Paciente não encontrado. Por favor, tente novamente.</div>");
            }

            return Partial("_DetalhesProntuario", pacienteEncontrado);
        }
    }
}
