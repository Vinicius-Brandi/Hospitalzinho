using FGB.Entidades;
using FGB.IRepositorios;
using NHibernate;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FGB.Dominio.Repositorios
{
    public class Repositorio : IRepositorio
    {
        private readonly ISession _session;

        public Repositorio(ISession session)
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
    }
}
