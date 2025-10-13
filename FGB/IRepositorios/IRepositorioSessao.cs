using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FGB.IRepositorios
{
    public interface IRepositorioSessao : IDisposable
    {
        IRepositorioConsulta GetRepositorioConsulta();

        IRepositorio GetRepositorio();

        IDisposable IniciaTransacao();

        void CommitaTransacao();

        void RollBackTransacao();

        IEnumerable<T1> ExecutaComando<T1>(string comando, object[] args);

        IEnumerable<dynamic> ExecutaComandoDynamic(string comando, object[] args);

        Task CommitaTransacaoAsync();

        Task<IEnumerable<T1>> ExecutaComandoAsync<T1>(string comando, object[] args);

        Task RollBackTransacaoAsync();
    }
}
