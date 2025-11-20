using FGB.IRepositorios;
using FGB.Servicos;
using Hospitalzinho.DTO.Post;
using Hospitalzinho.Entidades;
using System;
using System.Linq;
using System.Threading.Tasks;
using NHibernate.Exceptions;

namespace Hospitalzinho.Servico
{
    public class PacienteServico : ServicoCrud<Paciente>
    {
        private readonly IRepositorioSessao _repositorioSessao;

        public PacienteServico(IRepositorioSessao repositorioSessao) : base(repositorioSessao)
        {
            _repositorioSessao = repositorioSessao;
        }

        public async Task<Paciente> Cadastro(PacientePostDto dto)
        {
            Mensagens.Clear();
            Paciente pacienteSalvo = null;

            try
            {
                await MakeCrudTransactionAsync(async repo =>
                {
                    var consulta = _repositorioSessao.GetRepositorioConsulta();

                    // Verifica duplicidade de CPF ou CNS
                    var pacienteExistente = consulta.Consulta<Paciente>()
                        .FirstOrDefault(p => p.Cpf == dto.Cpf);

                    if (pacienteExistente != null)
                        throw new InvalidOperationException("Já existe um paciente com o mesmo CPF.");
                    if (pacienteExistente == null)
                        pacienteExistente = consulta.Consulta<Paciente>()
                        .FirstOrDefault(p => p.CNS == dto.CNS);
                    if (pacienteExistente != null)
                        throw new InvalidOperationException("Já existe um paciente com o mesmo CNS.");

                    // Cria o paciente principal
                    var paciente = new Paciente
                    {
                        Nome = dto.Nome,
                        CNS = dto.CNS,
                        Cpf = dto.Cpf,
                        DataNascimento = dto.DataNascimento,
                        NomePai = dto.NomePai,
                        NomeMae = dto.NomeMae,
                        CpfPai = dto.CpfPai,
                        CpfMae = dto.CpfMae,
                        Ativo = dto.Ativo,
                        Sexo = dto.Sexo,
                        Nacionalidade = dto.Nacionalidade,
                        Raca = dto.Raca,
                        Naturalidade = dto.Naturalidade,
                        Escolaridade = dto.Escolaridade,
                        CriadoEm = DateTime.Now,
                        UltimaAlteracao = DateTime.Now
                    };

                    await repo.IncluiAsync(paciente);
                    await repo.FlushAsync(); // garante que o ID seja gerado

                    // Contato
                    if (!string.IsNullOrWhiteSpace(dto.TelefoneResidencial) ||
                        !string.IsNullOrWhiteSpace(dto.TelefoneCelular) ||
                        !string.IsNullOrWhiteSpace(dto.Email))
                    {
                        var contato = new PacienteContato
                        {
                            PacienteId = paciente.Id,
                            Paciente = paciente,
                            TelefoneResidencial = dto.TelefoneResidencial,
                            TelefoneCelular = dto.TelefoneCelular,
                            Email = dto.Email,
                            CriadoEm = DateTime.Now,
                            UltimaAlteracao = DateTime.Now
                        };

                        await repo.IncluiAsync(contato);
                        await repo.FlushAsync();
                    }

                    // Endereço
                    var endereco = new PacienteEndereco
                    {
                        PacienteId = paciente.Id,
                        Paciente = paciente,
                        Logradouro = dto.Logradouro,
                        Numero = dto.Numero,
                        Complemento = dto.Complemento,
                        Bairro = dto.Bairro,
                        Cidade = dto.Cidade,
                        Estado = dto.Estado,
                        Cep = dto.Cep,
                        CriadoEm = DateTime.Now,
                        UltimaAlteracao = DateTime.Now
                    };

                    await repo.IncluiAsync(endereco);
                    await repo.FlushAsync();

                    // Prontuário
                    var prontuario = new PacienteProntuario
                    {
                        Paciente = paciente,
                        TipoSangue = dto.TipoSanguineo,
                        CriadoEm = DateTime.Now,
                        UltimaAlteracao = DateTime.Now
                    };

                    await repo.IncluiAsync(prontuario);
                    paciente.Prontuario = prontuario;

                    try
                    {
                        await repo.FlushAsync();
                    }
                    catch (GenericADOException ex) when (ex.InnerException?.Message.Contains("duplicate") == true)
                    {
                        throw new InvalidOperationException("Já existe um paciente com o mesmo CPF ou CNS.");
                    }

                    pacienteSalvo = paciente;
                });

                return pacienteSalvo;
            }
            catch (InvalidOperationException ex)
            {
                Mensagens.Add(ex.Message);
                return null;
            }
            catch (Exception ex)
            {
                Mensagens.Add("Erro ao cadastrar paciente: " + ex.Message);
                return null;
            }
        }

        public async Task<Paciente> Editar(PacientePostDto dto)
        {
            Mensagens.Clear();
            Paciente pacienteSalvo = null;

            try
            {
                await MakeCrudTransactionAsync(async repo =>
                {
                    var consulta = _repositorioSessao.GetRepositorioConsulta();

                    // 1. Carrega o paciente do banco
                    var paciente = consulta.Consulta<Paciente>()
                        .FirstOrDefault(p => p.Id == dto.Id);

                    if (paciente == null)
                        throw new InvalidOperationException("Paciente não encontrado.");

                    // 2. Verifica duplicidade CPF e CNS
                    var pacienteExistente = consulta.Consulta<Paciente>()
                        .FirstOrDefault(p => p.Cpf == dto.Cpf && p.Id != dto.Id);
                    if (pacienteExistente != null)
                        throw new InvalidOperationException("Já existe outro paciente com o mesmo CPF.");

                    pacienteExistente = consulta.Consulta<Paciente>()
                        .FirstOrDefault(p => p.CNS == dto.CNS && p.Id != dto.Id);
                    if (pacienteExistente != null)
                        throw new InvalidOperationException("Já existe outro paciente com o mesmo CNS.");

                    // 3. Atualiza dados principais
                    paciente.Nome = dto.Nome;
                    paciente.CNS = dto.CNS;
                    paciente.Cpf = dto.Cpf;
                    paciente.DataNascimento = dto.DataNascimento;
                    paciente.NomePai = dto.NomePai;
                    paciente.NomeMae = dto.NomeMae;
                    paciente.CpfPai = dto.CpfPai;
                    paciente.CpfMae = dto.CpfMae;
                    paciente.Ativo = dto.Ativo;
                    paciente.Sexo = dto.Sexo;
                    paciente.Nacionalidade = dto.Nacionalidade;
                    paciente.Raca = dto.Raca;
                    paciente.Naturalidade = dto.Naturalidade;
                    paciente.Escolaridade = dto.Escolaridade;
                    paciente.UltimaAlteracao = DateTime.Now;

                    await repo.MergeAsync(paciente);

                    // ----- CONTATO -----

                    var contato = paciente.Contato;
                    contato.TelefoneResidencial = dto.TelefoneResidencial;
                    contato.TelefoneCelular = dto.TelefoneCelular;
                    contato.Email = dto.Email;
                    contato.UltimaAlteracao = DateTime.Now;

                    await repo.MergeAsync(contato);

                    // ----- ENDEREÇO -----
                    var endereco = paciente.Endereco;
                    if (endereco == null)
                    {
                        endereco = new PacienteEndereco
                        {
                            Paciente = paciente,
                            PacienteId = paciente.Id,
                            CriadoEm = DateTime.Now
                        };
                        await repo.IncluiAsync(endereco);
                    }

                    endereco.Logradouro = dto.Logradouro;
                    endereco.Numero = dto.Numero;
                    endereco.Complemento = dto.Complemento;
                    endereco.Bairro = dto.Bairro;
                    endereco.Cidade = dto.Cidade;
                    endereco.Estado = dto.Estado;
                    endereco.Cep = dto.Cep;
                    endereco.UltimaAlteracao = DateTime.Now;

                    await repo.MergeAsync(endereco);

                    // ----- PRONTUÁRIO -----
                    var prontuario = paciente.Prontuario;
                    if (prontuario == null)
                    {
                        prontuario = new PacienteProntuario
                        {
                            Paciente = paciente,
                            CriadoEm = DateTime.Now
                        };
                        paciente.Prontuario = prontuario;
                    }

                    prontuario.TipoSangue = dto.TipoSanguineo;
                    prontuario.UltimaAlteracao = DateTime.Now;

                    await repo.MergeAsync(prontuario);

                    await repo.FlushAsync();

                    pacienteSalvo = paciente;
                });

                return pacienteSalvo;
            }
            catch (Exception ex)
            {
                Mensagens.Add(ex.Message);
                return null;
            }
        }
    }
}
