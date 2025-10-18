using HospitalzinhoAPI.DTO.Hospital.Prontuario;
using HospitalzinhoAPI.Models.Hospital.Paciente;
using HospitalzinhoAPI.Models.Hospital.Prontuario;

namespace HospitalzinhoAPI.Services.Prontuario
{
    public interface IProntuarioInterface
    {
        Task<List<ProntuarioAlergiaDTO>> BuscarProntuarioAlergias(string cpfPaciente);
        Task<List<ProntuarioConsultaDTO>> BuscarProntuarioConsultas(string cpfPaciente);
        Task<List<ProntuarioInternacaoDTO>> BuscarProntuarioInternacoes(string cpfPaciente);
        Task<List<ProntuarioVacinaDTO>> BuscarProntuarioVacinas(string cpfPaciente);
        Task<ProntuarioAlergiaDTO> AdicionarProntuarioAlergia(string cpfPaciente, ProntuarioAlergiaDTO prontuarioAlergia);
        Task<ProntuarioConsultaDTO> AdicionarProntuarioConsulta(string cpfPaciente, ProntuarioConsultaDTO prontuarioConsulta);
        Task<ProntuarioInternacaoDTO> AdicionarProntuarioInternacao(string cpfPaciente, ProntuarioInternacaoDTO prontuarioInternacao);
        Task<ProntuarioVacinaDTO> AdicionarProntuarioVacina(string cpfPaciente, ProntuarioVacinaDTO prontuarioVacina);
    }
}
