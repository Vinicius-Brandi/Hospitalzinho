using HospitalzinhoAPI.DTO.Paciente;
using HospitalzinhoAPI.Models;
using HospitalzinhoAPI.Models.Hospital.Paciente;

namespace HospitalzinhoAPI.Services.Paciente
{
    public interface IPacienteInterface
    {
        Task<List<PacienteDTO>?> BuscarTodosPacientes();
        Task<List<PacienteDTO>?> BuscarPacientePorCPF(string CPF);
        Task<List<PacienteModel>?> CadastrarPaciente(PacienteDTO pacienteDTO);
    }
}
