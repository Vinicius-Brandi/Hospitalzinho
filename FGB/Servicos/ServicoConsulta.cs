using FGB.Entidades;
using FGB.IRepositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FGB.Servicos
{
    public class ServicoConsulta<T> where T : EntidadeBase
    {
        protected IRepositorioSessao Repositorio { get; private set; }
        public ListaMensagens Mensagens { get; protected set; }

        public ServicoConsulta(IRepositorioSessao repositorio)
        {
            Repositorio = repositorio;
            Mensagens = new ListaMensagens();
        }

        public virtual T Retorna(long id)
        {
            return Repositorio.GetRepositorioConsulta().Retorna<T>(id);
        }

        public virtual async Task<T> RetornaAsync(long id)
        {
            return await Repositorio.GetRepositorioConsulta().RetornaAsync<T>(id);
        }

        public virtual IQueryable<T> Consulta()
        {
            return Repositorio.GetRepositorioConsulta().Consulta<T>();
        }

        public virtual IQueryable<T> Consulta(Expression<Func<T, bool>> where)
        {
            return Repositorio.GetRepositorioConsulta().Consulta<T>(where);
        }
    }
}
