using HospitalzinhoMVC.Models.BrandiAPI;
using HospitalzinhoMVC.Models.MinhaAPI;

namespace HospitalzinhoMVC.Services
{
    public class PacienteAPIService
    {
        private readonly HttpClient _httpClient;
        private const string BaseApiUrl = "http://localhost:5102/api/Paciente";

        public PacienteAPIService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<Paciente?> CreatePacienteAsync(Paciente paciente)
        {
            var response = await _httpClient.PostAsJsonAsync(BaseApiUrl, paciente);

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<Paciente>();
            }
            else
            {
                // LOGUE O ERRO PARA DEBUG!
                var errorContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Erro da API: {response.StatusCode} - {errorContent}");
                return null;
            }
        }
    }
}
