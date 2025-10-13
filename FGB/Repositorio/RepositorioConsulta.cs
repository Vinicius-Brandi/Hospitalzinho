using FGB.Entidades;
using FGB.IRepositorios;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FGB.Dominio.Repositorio
{
    public class RepositorioConsulta : IRepositorioConsulta
    {
        private readonly ISession _session;

        public RepositorioConsulta(ISession session)
        {
            _session = session;
        }

        public T Retorna<T>(long id) where T : EntidadeBase
        {
            return _session.Get<T>(id);
        }

        public async Task<T> RetornaAsync<T>(long id) where T : EntidadeBase
        {
            return await _session.GetAsync<T>(id);
        }

        public IQueryable<T> Consulta<T>() where T : EntidadeBase
        {
            return _session.Query<T>();
        }

        public IQueryable<T> Consulta<T>(Expression<Func<T, bool>> where) where T : EntidadeBase
        {
            return _session.Query<T>().Where(where);
        }
    }
}
