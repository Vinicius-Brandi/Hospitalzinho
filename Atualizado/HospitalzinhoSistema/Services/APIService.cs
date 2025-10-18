using HospitalzinhoSistema.Models;
using HospitalzinhoSistema.Models.Paciente;
using HospitalzinhoSistema.Models.Prontuario;
using Microsoft.AspNetCore.Mvc;

namespace HospitalzinhoSistema.Services
{
    public class APIService
    {
        private readonly HttpClient _httpClient;
        private const string BaseUrl = "http://localhost:5139/api/";

        public APIService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        
        public async Task<PacienteDTO> CreatePacienteAsync(PacienteDTO pacienteDTO)
        {
            var response = await _httpClient.PostAsJsonAsync(BaseUrl + "Paciente/CadastrarPaciente", pacienteDTO);

            if(response.IsSuccessStatusCode)
            {
                var createdPaciente = await response.Content.ReadFromJsonAsync<PacienteDTO>();
                return createdPaciente!;
            }
            else
            {
                throw new HttpRequestException($"Erro ao criar o paciente. Status Code: {response.StatusCode}");
            }
        }
        public async Task<IActionResult> CreateProntuario<T>(T prontuario, string cpfPaciente)
        {
            string endpoint = prontuario switch
            {
                ProntuarioAlergiaDTO => $"Prontuario/AdicionarProntuarioAlergia/{cpfPaciente}",
                ProntuarioVacinaDTO => $"Prontuario/AdicionarProntuarioVacina/{cpfPaciente}",
                ProntuarioConsultaDTO => $"Prontuario/AdicionarProntuarioConsulta/{cpfPaciente}",
                ProntuarioInternacaoDTO => $"Prontuario/AdicionarProntuarioInternacao/{cpfPaciente}",
                _ => throw new ArgumentException("Tipo de prontuário desconhecido.")
            };

            var response = await _httpClient.PostAsJsonAsync(BaseUrl + endpoint, prontuario);

            if (response.IsSuccessStatusCode)
            {
                return new OkResult();
            }
            else
            {
                throw new HttpRequestException($"Erro ao criar o prontuário. Status Code: {response.StatusCode}");
            }
        }

        public async Task<List<PacienteDTO>?> GetSugestoesPorCPFAsync(string cpf)
        {
            var response = await _httpClient.GetFromJsonAsync<List<PacienteDTO>>(BaseUrl + $"Paciente/BuscarSugestoesPacientePorCPF/{cpf}");

            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }

        public async Task<SugestoesViewModel> GetBuscarSugestoesAsync(string cpf, string pageName, string pageHandler)
        {
            if (string.IsNullOrWhiteSpace(cpf))
            {
                // Retorna um ViewModel com a lista de sugestões vazia.
                return new SugestoesViewModel
                {
                    Sugestoes = new List<PacienteDTO>(), // Lista vazia
                    PageName = pageName,
                    PageHandler = pageHandler
                };
            }

            var sugestoes = await GetSugestoesPorCPFAsync(cpf);

            var viewModel = new SugestoesViewModel
            {
                Sugestoes = sugestoes ?? new List<PacienteDTO>(),
                PageName = pageName,
                PageHandler = pageHandler
            };

            return viewModel;
        }
    }
}
