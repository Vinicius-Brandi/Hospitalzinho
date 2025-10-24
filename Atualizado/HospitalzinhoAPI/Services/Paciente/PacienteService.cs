using AutoMapper;
using HospitalzinhoAPI.Data;
using HospitalzinhoAPI.DTO.Paciente;
using HospitalzinhoAPI.Models;
using HospitalzinhoAPI.Models.Hospital.Paciente;
using Microsoft.EntityFrameworkCore;

namespace HospitalzinhoAPI.Services.Paciente
{
    public class PacienteService : IPacienteInterface
    {

        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public PacienteService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<PacienteDTO>?> BuscarTodosPacientes()
        {
            var pacientes = await _context.Pacientes
                                    .Include(p => p.Endereco)
                                    .Include(p => p.Contato)
                                    .Include(p => p.Convenio)
                                    .ToListAsync();

            return _mapper.Map<List<PacienteDTO>>(pacientes);
        }

        public async Task<List<PacienteDTO>?> BuscarSugestoesPacientePorCPF(string CPF)
        {
            if (string.IsNullOrWhiteSpace(CPF))
            {
                return new List<PacienteDTO>();
            }

            var pacientes = await _context.Pacientes
                                      .Include(p => p.Endereco)
                                      .Include(p => p.Contato)
                                      .Include(p => p.Convenio)
                                      .Where(p => p.CPF.StartsWith(CPF))
                                      .ToListAsync();

            return _mapper.Map<List<PacienteDTO>>(pacientes);
        }

        public async Task<PacienteDTO?> CadastrarPaciente(PacienteDTO pacienteDTO)
        {
            var paciente = _mapper.Map<PacienteModel>(pacienteDTO);

            _context.Add(paciente);
            await _context.SaveChangesAsync();

            return _mapper.Map<PacienteDTO>(paciente);
        }

        public async Task<PacienteDTO?> BuscarPacientePorCPF(string CPF)
        {
            if (string.IsNullOrWhiteSpace(CPF))
            {
                return null;
            }

            var pacientes = await _context.Pacientes
                                    .Include(p => p.Endereco)
                                    .Include(p => p.Contato)
                                    .Include(p => p.Convenio)
                                    .Include(p => p.ProntuarioConsulta)
                                    .Include(p => p.ProntuarioVacina)
                                    .Include(p => p.ProntuarioInternacao)
                                    .Include(p => p.ProntuarioAlergia)
                                    .Where(p => p.CPF == CPF).FirstOrDefaultAsync();

            return _mapper.Map<PacienteDTO>(pacientes);
        }
    }
}
