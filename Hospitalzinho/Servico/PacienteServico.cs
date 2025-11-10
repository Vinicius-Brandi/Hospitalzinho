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
                        .FirstOrDefault(p => p.Cpf == dto.Cpf || p.CNS == dto.CNS);

                    if (pacienteExistente != null)
                        throw new InvalidOperationException("Já existe um paciente com o mesmo CPF ou CNS.");

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
                        paciente.Contatos.Add(contato);
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
                    paciente.Enderecos.Add(endereco);

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
    }
}
