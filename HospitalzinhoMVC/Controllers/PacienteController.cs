using HospitalzinhoMVC.Models;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;
using System.Runtime.ConstrainedExecution;

namespace HospitalzinhoMVC.Controllers
{
    public class PacienteController : Controller
    {
        [HttpGet]
        public IActionResult Cadastro()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Cadastro(string nomeCompleto, string dataNascimento, string nomeMae, string nomePai, string cpfMae, string cpfPai, string cpf, string cns, string sexo, string raca, string nacionalidade, string naturalidade, string escolaridade, string cep, string ceplogradouro, string numero, string complemento, string bairro, string cidade, string estado, string telefoneResidencial, string telefoneCelular, string email)
        {
            Paciente paciente = new Paciente()
            {
                Nome = nomeCompleto,
                DataNascimento = DateTime.Parse(dataNascimento),
                NomeMae = nomeMae,
                NomePai = nomePai,
                CpfMae = cpfMae,
                CpfPai = cpfPai,
                Cpf = cpf,
                CNS = cns,
                Sexo = (SexoPaciente)Enum.Parse(typeof(SexoPaciente), sexo),
                Raca = (RacaPaciente)Enum.Parse(typeof(RacaPaciente), raca),
                Nacionalidade = nacionalidade,
                Naturalidade = naturalidade,
                Escolaridade = (EscolaridadePaciente)Enum.Parse(typeof(EscolaridadePaciente), escolaridade),
                Contato = new PacienteContato()
                {
                    TelefoneResidencial = telefoneResidencial,
                    TelefoneCelular = telefoneCelular,
                    Email = email
                },
                Endereco = new PacienteEndereco()
                {
                    Logradouro = ceplogradouro,
                    Numero = numero,
                    Complemento = complemento,
                    Bairro = bairro,
                    Cidade = cidade,
                    Estado = estado,
                    Cep = cep
                }
            };

            return View();
        }

        [HttpGet]
        public IActionResult Consulta()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Consulta(string cpfPaciente)
        {
            if (String.IsNullOrWhiteSpace(cpfPaciente))
            {
                Console.WriteLine("CPF inválido ou vazio");
                return View();
            }

            cpfPaciente = cpfPaciente.Replace(".", "").Replace("-", "");

            if (cpfPaciente.Any(char.IsLetter))
            {
                Console.WriteLine("CPF não pode conter letras");
                return View();
            }

            return View();
        }
    }
}
    