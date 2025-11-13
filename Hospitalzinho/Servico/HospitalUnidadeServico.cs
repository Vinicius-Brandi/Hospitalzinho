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
    public class HospitalUnidadeServico : ServicoCrud<HospitalUnidade>
    {
        private readonly IRepositorioSessao _repositorioSessao;

        public HospitalUnidadeServico(IRepositorioSessao repositorioSessao) : base(repositorioSessao)
        {
            _repositorioSessao = repositorioSessao;
        }

        public async Task<HospitalUnidade> Cadastro(HospitalUnidade dto)
        {
            Mensagens.Clear();
            HospitalUnidade unidadeSalva = null;

            try
            {
                await MakeCrudTransactionAsync(async repo =>
                {
                    var consulta = _repositorioSessao.GetRepositorioConsulta();
                    var unidadeExistente = consulta.Consulta<HospitalUnidade>()
                        .FirstOrDefault(u => u.CNES == dto.CNES);

                    if (unidadeExistente != null)
                        throw new InvalidOperationException($"Já existe uma unidade com o CNES {dto.CNES}.");

                    // Cria Hospital Unidade
                    var unidade = new HospitalUnidade
                    {
                        Nome = dto.Nome,
                        CNES = dto.CNES,
                        TipoUnidade = dto.TipoUnidade,
                        InstituicaoPaiId = dto.InstituicaoPaiId,
                        CriadoEm = DateTime.Now,
                        UltimaAlteracao = DateTime.Now
                    };

                    // Endereço
                    if (dto.Endereco != null)
                    {
                        var endereco = new HospitalEndereco
                        {
                            CEP = dto.Endereco.CEP,
                            Cidade = dto.Endereco.Cidade,
                            Bairro = dto.Endereco.Bairro,
                            Rua = dto.Endereco.Rua,
                            Numero = dto.Endereco.Numero,
                            Complemento = dto.Endereco.Complemento,
                            CriadoEm = DateTime.Now,
                            UltimaAlteracao = DateTime.Now
                        };

                        await repo.IncluiAsync(endereco);
                        await repo.FlushAsync();

                        unidade.Endereco = endereco;
                    }

                    await repo.IncluiAsync(unidade);

                    try
                    {
                        await repo.FlushAsync();
                    }
                    catch (GenericADOException ex) when (ex.InnerException?.Message.Contains("duplicate") == true)
                    {
                        throw new InvalidOperationException($"Já existe uma unidade com o CNES {dto.CNES}.");
                    }

                    unidadeSalva = unidade;
                });

                return unidadeSalva;
            }
            catch (InvalidOperationException ex)
            {
                Mensagens.Add(ex.Message);
                return null;
            }
            catch (Exception ex)
            {
                Mensagens.Add("Erro ao cadastrar unidade hospitalar: " + ex.Message);
                return null;
            }
        }
    }
}
