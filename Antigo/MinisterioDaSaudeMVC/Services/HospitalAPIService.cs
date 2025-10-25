using MinisterioDaSaudeMVC.Models;

namespace MinisterioDaSaudeMVC.Services
{
    public class HospitalAPIService
    {
        private readonly HttpClient _httpClient;
        private const string BaseApiUrl = "http://localhost:5102/api/Paciente";

        public HospitalAPIService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<HospitalUnidade?> CreatePacienteAsync(HospitalUnidade hospitalUnidade)
        {
            var response = await _httpClient.PostAsJsonAsync(BaseApiUrl, hospitalUnidade);

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<HospitalUnidade>();
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
