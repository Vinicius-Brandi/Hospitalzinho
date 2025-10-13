using FGB.Dominio.Repositorios;
using FGB.Entidades;
using FGB.IRepositorios;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FGB.Dominio.Repositorios
{
    public class RepositorioSessao : IRepositorioSessao
    {
        private readonly ISession _session;
        private ITransaction _transacao;

        public RepositorioSessao(ISession session)
        {
            _session = session;
        }

        public void Inclui<T>(T entidade) where T : EntidadeBase
        {
            _session.Save(entidade);
        }

        public async Task IncluiAsync<T>(T entidade) where T : EntidadeBase
        {
            await _session.SaveAsync(entidade);
        }

        public void Upsert<T>(T entidade) where T : EntidadeBase
        {
            _session.SaveOrUpdate(entidade);
        }

        public async Task UpsertAsync<T>(T entidade) where T : EntidadeBase
        {
            await _session.SaveOrUpdateAsync(entidade);
        }

        public T Merge<T>(T entidade) where T : EntidadeBase
        {
            return _session.Merge(entidade);
        }

        public async Task<T> MergeAsync<T>(T entidade) where T : EntidadeBase
        {
            return await _session.MergeAsync(entidade);
        }

        public void Exclui<T>(T entidade) where T : EntidadeBase
        {
            _session.Delete(entidade);
        }

        public async Task ExcluiAsync<T>(T entidade) where T : EntidadeBase
        {
            await _session.DeleteAsync(entidade);
        }

        public int Update<T>(Func<IBuilderUpdate<T>, IQueryable<T>> setValues) where T : EntidadeBase
        {
            throw new NotImplementedException("Update direto não implementado neste repositório.");
        }

        public Task<int> UpdateAsync<T>(Func<IBuilderUpdate<T>, IQueryable<T>> setValues) where T : EntidadeBase
        {
            throw new NotImplementedException("UpdateAsync direto não implementado neste repositório.");
        }

        public IDisposable IniciaTransacao()
        {
            _transacao = _session.BeginTransaction();
            return _transacao;
        }

        public void CommitaTransacao()
        {
            _transacao?.Commit();
        }

        public async Task CommitaTransacaoAsync()
        {
            if (_transacao != null)
                await _transacao.CommitAsync();
        }

        public void RollBackTransacao()
        {
            _transacao?.Rollback();
        }

        public async Task RollBackTransacaoAsync()
        {
            if (_transacao != null)
                await _transacao.RollbackAsync();
        }

        public IRepositorio GetRepositorio()
        {
            return new Repositorio(_session);
        }

        public IRepositorioConsulta GetRepositorioConsulta()
        {
            return new RepositorioConsulta(_session);
        }

        public IEnumerable<T1> ExecutaComando<T1>(string comando, object[] args)
        {
            throw new NotImplementedException("Implementar execução de comando SQL e mapeamento para T1.");
        }

        public IEnumerable<dynamic> ExecutaComandoDynamic(string comando, object[] args)
        {
            throw new NotImplementedException("Implementar execução de comando SQL e retorno dinâmico.");
        }

        public async Task<IEnumerable<T1>> ExecutaComandoAsync<T1>(string comando, object[] args)
        {
            throw new NotImplementedException("Implementar execução assíncrona de comando SQL e mapeamento para T1.");
        }

        public void Dispose()
        {
            _transacao?.Dispose();
            _session?.Dispose();
        }
    }
}
