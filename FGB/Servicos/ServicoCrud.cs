using FGB.Entidades;
using FGB.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FGB.Servicos
{
    public class ServicoCrud<T> : ServicoConsulta<T> where T : EntidadeBase
    {
        public event MergeHandler<T> PreMerge;
        public event MergeHandler<T> PosMerge;
        public event ExcluiHandler<T> PreExclui;
        public event ExcluiHandler<T> PosExclui;
        public event IncluiHandler<T> PreInclui;
        public event IncluiHandler<T> PosInclui;

        public ServicoCrud(IRepositorioSessao repositorio) : base(repositorio)
        {
        }

        public virtual bool Validacoes(T entidade)
        {
            Mensagens.Clear();
            if (entidade == null)
            {
                Mensagens.Add(new ArgumentNullException("entidade", "menu.mensagem.requisicao.vazia"));
                return false;
            }
            return Valida(entidade);
        }

        public virtual bool Valida(T entidade)
        {
            return !Mensagens.HasErro();
        }

        public bool MakeCrudTransaction(Action<IRepositorio> transaction)
        {
            using (Repositorio.IniciaTransacao())
            {
                var repositorio = Repositorio.GetRepositorio();
                try
                {
                    transaction(repositorio);
                    Repositorio.CommitaTransacao();
                }
                catch (Exception ex)
                {
                    Repositorio.RollBackTransacao();
                    Mensagens.Add(ex);
                }

                return !Mensagens.HasErro();
            }
        }

        public async Task<bool> MakeCrudTransactionAsync(Func<IRepositorio, Task> transaction)
        {
            using (Repositorio.IniciaTransacao())
            {
                var repositorio = Repositorio.GetRepositorio();
                try
                {
                    await transaction(repositorio);
                    await Repositorio.CommitaTransacaoAsync();
                }
                catch (Exception ex)
                {
                    await Repositorio.RollBackTransacaoAsync();
                    Mensagens.Add(ex);
                }

                return !Mensagens.HasErro();
            }
        }

        public virtual bool Inclui(params T[] entidades)
        {
            return ProcessoInclusao(entidades, () => MakeCrudTransaction(repo =>
            {
                foreach (var entidade in entidades)
                {
                    entidade.CriadoEm = entidade.CriadoEm ?? DateTime.Now;
                    entidade.UltimaAlteracao = DateTime.Now;
                    repo.Inclui(entidade);
                }
            }));
        }

        public virtual async Task<bool> IncluiAsync(params T[] entidades)
        {
            return await ProcessoInclusaoAsync(entidades, async () => await MakeCrudTransactionAsync(async repo =>
            {
                foreach (var entidade in entidades)
                {
                    entidade.CriadoEm = DateTime.Now;
                    entidade.UltimaAlteracao = DateTime.Now;
                    await repo.IncluiAsync(entidade);
                }
            }));
        }
        public virtual bool ProcessoInclusao(T[] entidades, Func<bool> process)
        {
            if (entidades.Length == 0)
                return true;

            if (!entidades.All(Validacoes))
                return false;

            foreach (var entidade in entidades)
            {
                entidade.CriadoEm = DateTime.Now;
                entidade.UltimaAlteracao = DateTime.Now;
                try { PreInclui?.Invoke(new IncluiInfo<T>(entidade)); } catch (Exception ex) { Mensagens.Add(ex); }
            }

            var sucesso = process();
            if (sucesso)
            {
                foreach (var entidade in entidades)
                {
                    try { PosInclui?.Invoke(new IncluiInfo<T>(entidade)); } catch (Exception ex) { Mensagens.Add(ex); }
                }
            }

            return sucesso;
        }

        /// <summary>
        /// Executa o processo de inclusão assíncrono, disparando eventos e tratando exceções dos handlers.
        /// </summary>
        public virtual async Task<bool> ProcessoInclusaoAsync(T[] entidades, Func<Task<bool>> process)
        {
            if (entidades.Length == 0)
                return true;

            if (!entidades.All(Validacoes))
                return false;

            foreach (var entidade in entidades)
            {
                entidade.CriadoEm = DateTime.Now;
                entidade.UltimaAlteracao = DateTime.Now;
                try { PreInclui?.Invoke(new IncluiInfo<T>(entidade)); } catch (Exception ex) { Mensagens.Add(ex); }
            }

            var sucesso = await process();
            if (sucesso)
            {
                foreach (var entidade in entidades)
                {
                    try { PosInclui?.Invoke(new IncluiInfo<T>(entidade)); } catch (Exception ex) { Mensagens.Add(ex); }
                }
            }

            return sucesso;
        }

        public virtual T Merge(T entidade)
        {
            if (!ProcessoMerge(entidade, entidadeOld => MakeCrudTransaction(repo =>
            {
                entidade.UltimaAlteracao = DateTime.Now;
                entidade.CriadoEm = entidadeOld.CriadoEm;
                entidade = repo.Merge(entidade);
            })))
            {
                return null;
            }

            return entidade;
        }

        public virtual async Task<T> MergeAsync(T entidade)
        {
            return await ProcessoMergeAsync(entidade, async entidadeOld => await MakeCrudTransactionAsync(async repo =>
            {
                entidade.UltimaAlteracao = DateTime.Now;
                entidade.CriadoEm = entidadeOld.CriadoEm;
                entidade = await repo.MergeAsync(entidade);
            })) ? entidade : null;
        }

        /// <summary>
        /// Executa o processo de merge, disparando eventos e tratando exceções dos handlers.
        /// </summary>
        protected virtual bool ProcessoMerge(T entidade, Func<T, bool> process)
        {
            if (!Validacoes(entidade))
                return false;

            var entidadeOld = Retorna(entidade.Id);
            if (entidadeOld == null)
                return false;

            // VincularColecoes removido
            try { PreMerge?.Invoke(new MergeInfo<T>(entidadeOld, entidade)); } catch (Exception ex) { Mensagens.Add(ex); }

            var sucesso = process(entidadeOld);
            if (sucesso)
            {
                try { PosMerge?.Invoke(new MergeInfo<T>(entidadeOld, entidade)); } catch (Exception ex) { Mensagens.Add(ex); }
            }

            return sucesso;
        }

        /// <summary>
        /// Executa o processo de merge assíncrono, disparando eventos e tratando exceções dos handlers.
        /// </summary>
        protected virtual async Task<bool> ProcessoMergeAsync(T entidade, Func<T, Task<bool>> process)
        {
            if (!Validacoes(entidade))
                return false;

            var entidadeOld = await RetornaAsync(entidade.Id);
            if (entidadeOld == null)
                return false;

            // VincularColecoes removido
            try { PreMerge?.Invoke(new MergeInfo<T>(entidadeOld, entidade)); } catch (Exception ex) { Mensagens.Add(ex); }

            var sucesso = await process(entidadeOld);
            if (sucesso)
            {
                try { PosMerge?.Invoke(new MergeInfo<T>(entidadeOld, entidade)); } catch (Exception ex) { Mensagens.Add(ex); }
            }

            return sucesso;
        }

        public virtual T Exclui(long id)
        {
            var entidade = Retorna(id);
            if (entidade == null)
            {
                var ex = new ApplicationException("menu.mensagem.registro.nao.encontrado");
                Mensagens.Add(ex);
                return null;
            }

            return Exclui(entidade) ? entidade : null;
        }

        public virtual bool Exclui(params T[] entidades)
        {
            return ProcessarExclusao(entidades, () => MakeCrudTransaction(repo =>
            {
                foreach (var entidade in entidades)
                {
                    repo.Exclui(entidade);
                }
            }));
        }

        public virtual async Task<T> ExcluiAsync(long id)
        {
            var entidade = await RetornaAsync(id);
            if (entidade == null)
            {
                var ex = new ApplicationException("menu.mensagem.registro.nao.encontrado");
                Mensagens.Add(ex);
                return null;
            }

            return await ExcluiAsync(entidade) ? entidade : null;
        }

        public virtual async Task<bool> ExcluiAsync(params T[] entidades)
        {
            return await ProcessarExclusaoAsync(entidades, async () => await MakeCrudTransactionAsync(async repo =>
            {
                foreach (var entidade in entidades)
                {
                    await repo.ExcluiAsync(entidade);
                }
            }));
        }

        /// <summary>
        /// Executa o processo de exclusão, disparando eventos e tratando exceções dos handlers.
        /// </summary>
        protected virtual bool ProcessarExclusao(T[] entidades, Func<bool> process)
        {
            if (entidades.Length == 0)
                return true;

            foreach (var entidade in entidades)
            {
                try { PreExclui?.Invoke(new ExcluiInfo<T>(entidade)); } catch (Exception ex) { Mensagens.Add(ex); }
            }

            var sucesso = process();
            if (sucesso)
            {
                foreach (var entidade in entidades)
                {
                    try { PosExclui?.Invoke(new ExcluiInfo<T>(entidade)); } catch (Exception ex) { Mensagens.Add(ex); }
                }
            }

            return sucesso;
        }

        /// <summary>
        /// Executa o processo de exclusão assíncrono, disparando eventos e tratando exceções dos handlers.
        /// </summary>
        protected virtual async Task<bool> ProcessarExclusaoAsync(T[] entidades, Func<Task<bool>> process)
        {
            if (entidades.Length == 0)
                return true;

            foreach (var entidade in entidades)
            {
                try { PreExclui?.Invoke(new ExcluiInfo<T>(entidade)); } catch (Exception ex) { Mensagens.Add(ex); }
            }

            var sucesso = await process();
            if (sucesso)
            {
                foreach (var entidade in entidades)
                {
                    try { PosExclui?.Invoke(new ExcluiInfo<T>(entidade)); } catch (Exception ex) { Mensagens.Add(ex); }
                }
            }

            return sucesso;
        }
    }
}
