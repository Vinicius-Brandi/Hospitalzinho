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
            try
            {
                var pacientes = await _context.Pacientes
                                      .Include(p => p.Endereco)
                                      .Include(p => p.Contato)
                                      .Include(p => p.Convenio)
                                      .ToListAsync();

                return _mapper.Map<List<PacienteDTO>>(pacientes);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<List<PacienteDTO>?> BuscarPacientePorCPF(string CPF)
        {
            try
            {
                var pacientes = await _context.Pacientes
                                      .Include(p => p.Endereco)
                                      .Include(p => p.Contato)
                                      .Include(p => p.Convenio)
                                      .Where(p => p.CPF.Contains(CPF))
                                      .ToListAsync();

                if (pacientes != null && pacientes.Count != 0)
                {
                    return _mapper.Map<List<PacienteDTO>>(pacientes);
                }

                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<List<PacienteModel>?> CadastrarPaciente(PacienteDTO pacienteDTO)
        {
            try
            {
                PacienteModel paciente = new PacienteModel()
                {
                    Nome = pacienteDTO.Nome,
                    CNS = pacienteDTO.CNS,
                    CPF = pacienteDTO.CPF,
                    NomePai = pacienteDTO.NomePai,
                    NomeMae = pacienteDTO.NomeMae,
                    CPFPai = pacienteDTO.CPFPai,
                    CPFMae = pacienteDTO.CPFMae,
                    Nacionalidade = pacienteDTO.Nacionalidade,
                    Naturalidade = pacienteDTO.Naturalidade,
                    DataNascimento = pacienteDTO.DataNascimento?.ToUniversalTime(),
                    Genero = pacienteDTO.Genero,
                    Etinia = pacienteDTO.Etinia,
                    Escolaridade = pacienteDTO.Escolaridade,
                    Endereco = new PacienteEndereco()
                    {
                        Logradouro = pacienteDTO.Endereco.Logradouro,
                        Numero = pacienteDTO.Endereco.Numero,
                        Complemento = pacienteDTO.Endereco.Complemento,
                        Bairro = pacienteDTO.Endereco.Bairro,
                        Cidade = pacienteDTO.Endereco.Cidade,
                        Estado = pacienteDTO.Endereco.Estado,
                        CEP = pacienteDTO.Endereco.CEP
                    },
                    Contato = new PacienteContato()
                    {
                        TelefoneCelular = pacienteDTO.Contato.TelefoneCelular,
                        TelefoneResidencial = pacienteDTO.Contato.TelefoneResidencial,
                        Email = pacienteDTO.Contato.Email
                    }
                };

                _context.Add(paciente);
                await _context.SaveChangesAsync();

                return await _context.Pacientes.ToListAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
