using HospitalzinhoAPI.DTO.Hospital.Prontuario;
using HospitalzinhoAPI.Models.Hospital.Paciente;
using HospitalzinhoAPI.Models.Hospital.Prontuario;

namespace HospitalzinhoAPI.Services.Prontuario
{
    public interface IProntuarioInterface
    {
        Task<List<ProntuarioAlergiaDTO>> BuscarProntuarioAlergias(int idPaciente);
        Task<List<ProntuarioConsultaDTO>> BuscarProntuarioConsultas(int idPaciente);
        Task<List<ProntuarioInternacaoDTO>> BuscarProntuarioInternacoes(int idPaciente);
        Task<List<ProntuarioVacinaDTO>> BuscarProntuarioVacinas(int idPaciente);
        Task<ProntuarioAlergiaDTO> AdicionarProntuarioAlergia(int idPaciente, ProntuarioAlergiaDTO prontuarioAlergia);
        Task<ProntuarioConsultaDTO> AdicionarProntuarioConsulta(int idPaciente, ProntuarioConsultaDTO prontuarioConsulta);
        Task<ProntuarioInternacaoDTO> AdicionarProntuarioInternacao(int idPaciente, ProntuarioInternacaoDTO prontuarioInternacao);
        Task<ProntuarioVacinaDTO> AdicionarProntuarioVacina(int idPaciente, ProntuarioVacinaDTO prontuarioVacina);
    }
}
