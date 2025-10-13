//using FGB.Entidades;
//using FGB.IRepositorios;
//using FGB.Servicos;

//namespace FGB.Exemplos
//{
//    // Exemplo de uma entidade
//    public class Pessoa : EntidadeBase
//    {
//        public string Nome { get; set; }
//        public string Email { get; set; }
//    }

//    // Exemplo de uso do serviço CRUD
//    public class ExemploUso
//    {
//        private readonly ServicoCrud<Pessoa> _servicoPessoa;

//        public ExemploUso(IRepositorioSessao repositorio)
//        {
//            _servicoPessoa = new ServicoCrud<Pessoa>(repositorio);
            
//            // Configurar eventos se necessário
//            _servicoPessoa.PreInclui += OnPreInclui;
//            _servicoPessoa.PosInclui += OnPosInclui;
//        }

//        private void OnPreInclui(IncluiInfo<Pessoa> info)
//        {
//            // Lógica antes da inclusão
//            Console.WriteLine($"Incluindo pessoa: {info.Entidade.Nome}");
//        }

//        private void OnPosInclui(IncluiInfo<Pessoa> info)
//        {
//            // Lógica após a inclusão
//            Console.WriteLine($"Pessoa incluída com ID: {info.Entidade.Id}");
//        }

//        public async Task ExemploOperacoes()
//        {
//            // Criar uma nova pessoa
//            var pessoa = new Pessoa
//            {
//                Nome = "João Silva",
//                Email = "joao@email.com"
//            };

//            // Incluir
//            var sucesso = await _servicoPessoa.IncluiAsync(pessoa);
//            if (!sucesso)
//            {
//                // Verificar mensagens de erro
//                foreach (var mensagem in _servicoPessoa.Mensagens.Where(m => m.Erro))
//                {
//                    Console.WriteLine($"Erro: {mensagem.Mensagem}");
//                }
//            }

//            // Consultar
//            var pessoaBanco = await _servicoPessoa.RetornaAsync(pessoa.Id);
            
//            // Atualizar
//            if (pessoaBanco != null)
//            {
//                pessoaBanco.Email = "novo@email.com";
//                var pessoaAtualizada = await _servicoPessoa.MergeAsync(pessoaBanco);
//            }

//            // Excluir
//            var pessoaExcluida = await _servicoPessoa.ExcluiAsync(pessoa.Id);
//        }
//    }
//}
