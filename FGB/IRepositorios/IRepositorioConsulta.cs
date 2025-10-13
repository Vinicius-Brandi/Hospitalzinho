using FGB.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FGB.IRepositorios
{
    public interface IRepositorioConsulta
    {
        T Retorna<T>(long id) where T : EntidadeBase;

        IQueryable<T> Consulta<T>() where T : EntidadeBase;

        IQueryable<T> Consulta<T>(Expression<Func<T, bool>> where) where T : EntidadeBase;

        Task<T> RetornaAsync<T>(long id) where T : EntidadeBase;
    }
}
