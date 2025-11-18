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

        Task CommitaTransacaoAsync();

        Task RollBackTransacaoAsync();
    }
}
