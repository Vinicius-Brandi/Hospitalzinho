using AutoMapper;
using HospitalzinhoAPI.Data;
using HospitalzinhoAPI.DTO.Hospital.Prontuario;
using HospitalzinhoAPI.DTO.Paciente;
using HospitalzinhoAPI.Migrations;
using HospitalzinhoAPI.Models.Hospital.Paciente;
using HospitalzinhoAPI.Models.Hospital.Prontuario;
using Microsoft.EntityFrameworkCore;

namespace HospitalzinhoAPI.Services.Prontuario
{
    public class ProntuarioService : IProntuarioInterface
    {

        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ProntuarioService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProntuarioAlergiaDTO> AdicionarProntuarioAlergia(string cpfPaciente, ProntuarioAlergiaDTO prontuarioAlergia)
        {
            var paciente = await _context.Pacientes.FirstOrDefaultAsync(p => p.CPF == cpfPaciente);
            ProntuarioAlergia prontuario = _mapper.Map<ProntuarioAlergia>(prontuarioAlergia);
            prontuario.Paciente = paciente;

            _context.Add(prontuario);
            await _context.SaveChangesAsync();

            return prontuarioAlergia;
        }

        public async Task<ProntuarioConsultaDTO> AdicionarProntuarioConsulta(string cpfPaciente, ProntuarioConsultaDTO prontuarioConsulta)
        {
            var paciente = await _context.Pacientes.FirstOrDefaultAsync(p => p.CPF == cpfPaciente);
            ProntuarioConsulta prontuario = _mapper.Map<ProntuarioConsulta>(prontuarioConsulta);
            prontuario.Paciente = paciente!;

            _context.Add(prontuario);
            await _context.SaveChangesAsync();

            return prontuarioConsulta;
        }

        public async Task<ProntuarioInternacaoDTO> AdicionarProntuarioInternacao(string cpfPaciente, ProntuarioInternacaoDTO prontuarioInternacao)
        {
            var paciente = await _context.Pacientes.FirstOrDefaultAsync(p => p.CPF == cpfPaciente);
            ProntuarioInternacao prontuario = _mapper.Map<ProntuarioInternacao>(prontuarioInternacao);
            prontuario.Paciente = paciente!;

            _context.Add(prontuario);
            await _context.SaveChangesAsync();

            return prontuarioInternacao;
        }

        public async Task<ProntuarioVacinaDTO> AdicionarProntuarioVacina(string cpfPaciente, ProntuarioVacinaDTO prontuarioVacina)
        {
            var paciente = await _context.Pacientes.FirstOrDefaultAsync(p => p.CPF == cpfPaciente);
            ProntuarioVacina prontuario = _mapper.Map<ProntuarioVacina>(prontuarioVacina);
            prontuario.Paciente = paciente!;

            _context.Add(prontuario);
            await _context.SaveChangesAsync();

            return prontuarioVacina;
        }

        public async Task<List<ProntuarioAlergiaDTO>> BuscarProntuarioAlergias(string cpfPaciente)
        {
            var dado = await _context.ProntuarioAlergias.Where(p => p.Paciente.CPF == cpfPaciente).ToListAsync();

            return _mapper.Map<List<ProntuarioAlergiaDTO>>(dado);
        }

        public async Task<List<ProntuarioConsultaDTO>> BuscarProntuarioConsultas(string cpfPaciente)
        {
            var dado = await _context.ProntuarioConsultas.Where(p => p.Paciente.CPF == cpfPaciente).ToListAsync();

            return _mapper.Map<List<ProntuarioConsultaDTO>>(dado);
        }

        public async Task<List<ProntuarioInternacaoDTO>> BuscarProntuarioInternacoes(string cpfPaciente)
        {
            var dado = await _context.ProntuarioInternacoes.Where(p => p.Paciente.CPF == cpfPaciente).ToListAsync();

            return _mapper.Map<List<ProntuarioInternacaoDTO>>(dado);
        }

        public async Task<List<ProntuarioVacinaDTO>> BuscarProntuarioVacinas(string cpfPaciente)
        {
            var dado = await _context.ProntuarioVacinas.Where(p => p.Paciente.CPF == cpfPaciente).ToListAsync();

            return _mapper.Map<List<ProntuarioVacinaDTO>>(dado);
        }
    }
}
