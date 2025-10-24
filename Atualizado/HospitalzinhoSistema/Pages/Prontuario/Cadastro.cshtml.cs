using HospitalzinhoSistema.Models;
using HospitalzinhoSistema.Models.Paciente;
using HospitalzinhoSistema.Models.Prontuario;
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
            var pacienteEncontrado = await _pacienteAPIService.GetPaciente(cpf);

            if (pacienteEncontrado == null)
            {
                return Content("<div class='alerta-erro'>Paciente não encontrado. Por favor, tente novamente.</div>");
            }

            return Partial("_DetalhesProntuario", pacienteEncontrado);
        }

        public IActionResult OnGetFormularioRegistro(string tipoRegistro)
        {
            switch (tipoRegistro)
            {
                case "vacina":
                    return Partial("_NovaVacinaPartial", new ProntuarioVacinaDTO());
                case "internacao":
                    return Partial("_NovaInternacaoPartial", new ProntuarioInternacaoDTO());
                case "alergia":
                    return Partial("_NovaAlergiaPartial", new ProntuarioAlergiaDTO());
                case "consulta":
                default:
                    return Partial("_NovaConsultaPartial", new ProntuarioConsultaDTO());
            }
        }

        public async Task<IActionResult> OnPostSalvarRegistroAsync(string tipoRegistro, string cpf)
        {
            object? registro = null;

            switch (tipoRegistro?.ToLower())
            {
                case "consulta":
                    var consulta = new ProntuarioConsultaDTO();
                    await TryUpdateModelAsync(consulta);
                    if (!TryValidateModel(consulta))
                        return Partial("_NovaConsultaPartial", consulta);
                    registro = consulta;
                    break;

                case "vacina":
                    var vacina = new ProntuarioVacinaDTO();
                    await TryUpdateModelAsync(vacina);
                    if (!TryValidateModel(vacina))
                        return Partial("_NovaVacinaPartial", vacina);
                    registro = vacina;
                    break;

                case "internacao":
                    var internacao = new ProntuarioInternacaoDTO();
                    await TryUpdateModelAsync(internacao);
                    if (!TryValidateModel(internacao))
                        return Partial("_NovaInternacaoPartial", internacao);
                    registro = internacao;
                    break;

                case "alergia":
                    var alergia = new ProntuarioAlergiaDTO();
                    await TryUpdateModelAsync(alergia);
                    if (!TryValidateModel(alergia))
                        return Partial("_NovaAlergiaPartial", alergia);
                    registro = alergia;
                    break;

                default:
                    return BadRequest("Tipo de registro inválido.");
            }

            await _pacienteAPIService.CreateProntuario(registro, cpf);
            return Content("<div id='adicionar-registro'><h2>Registro salvo com sucesso!</h2></div>");
        }
    }
}
