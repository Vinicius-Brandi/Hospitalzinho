using HospitalzinhoSistema.Models.Paciente;
using Microsoft.AspNetCore.Mvc;

namespace HospitalzinhoSistema.Services
{
    public class PacienteAPIService
    {
        private readonly HttpClient _httpClient;
        private const string BaseUrl = "http://localhost:5139/api/";

        public PacienteAPIService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        
        public async void CreatePacienteAsync(PacienteDTO pacienteDTO)
        {
            var response = await _httpClient.PostAsJsonAsync(BaseUrl + "Paciente/CadastrarPaciente", pacienteDTO);
        }

        public async Task<List<PacienteDTO>?> GetSugestoesPorCPFAsync(string cpf)
        {
            var response = await _httpClient.GetFromJsonAsync<List<PacienteDTO>>(BaseUrl + $"Paciente/BuscarPacientePorCPF/{cpf}");

            if (response != null)
            {
                return response;
            }
            else
            {
                return null;
            }
        }
    }
}
