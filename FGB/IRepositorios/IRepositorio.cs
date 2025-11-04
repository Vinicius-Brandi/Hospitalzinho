using FGB.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FGB.IRepositorios
{
    public interface IRepositorio
    {
        void Inclui<T>(T entidade) where T : EntidadeBase;

        void Upsert<T>(T entidade) where T : EntidadeBase;

        T Merge<T>(T entidade) where T : EntidadeBase;

        void Exclui<T>(T entidade) where T : EntidadeBase;

        Task IncluiAsync<T>(T entidade) where T : EntidadeBase;
        Task FlushAsync();

        Task UpsertAsync<T>(T entidade) where T : EntidadeBase;

        Task<T> MergeAsync<T>(T entidade) where T : EntidadeBase;

        Task ExcluiAsync<T>(T entidade) where T : EntidadeBase;

        int Update<T>(Func<IBuilderUpdate<T>, IQueryable<T>> setValues) where T : EntidadeBase;

        Task<int> UpdateAsync<T>(Func<IBuilderUpdate<T>, IQueryable<T>> setValues) where T : EntidadeBase;
    }

    public interface IBuilderUpdate<T>
    {
        IQueryable<T> Where(Expression<Func<T, bool>> exp);

        IBuilderUpdate<T> Set<T2>(Expression<Func<T, T2>> prop, Expression<Func<T, T2>> value);
    }
}
