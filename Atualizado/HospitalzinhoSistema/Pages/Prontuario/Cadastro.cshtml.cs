using HospitalzinhoSistema.Models;
using HospitalzinhoSistema.Models.Paciente;
using HospitalzinhoSistema.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HospitalzinhoSistema.Pages.Prontuario
{
    public class CadastroModel : PageModel
    {

        private readonly PacienteAPIService _pacienteAPIService;

        public CadastroModel(PacienteAPIService pacienteAPIService)
        {
            _pacienteAPIService = pacienteAPIService;
        }

        [BindProperty(SupportsGet = true)]
        public string? SearchTerm { get; set; }

        public async Task<IActionResult> OnGetBuscarSugestoesAsync()
        {
            var sugestoes = await _pacienteAPIService.GetSugestoesPorCPFAsync(SearchTerm);


            if (string.IsNullOrWhiteSpace(SearchTerm) || sugestoes != null && sugestoes.Count == 0)
            {
                return Content("");
            }

            var viewModel = new SugestoesViewModel
            {
                Sugestoes = sugestoes ?? new List<PacienteDTO>(),
                PageName = "/Prontuario/Cadastro", // O caminho completo
                PageHandler = "Selecionar"
            };

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
