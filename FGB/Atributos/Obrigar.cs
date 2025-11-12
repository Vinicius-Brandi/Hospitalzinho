using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using NHibernate;

namespace FGB.Dominio.Atributos
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class ObrigarAttribute : RequiredAttribute
    {
        private readonly Type? _tipoRelacionado;

        public ObrigarAttribute(Type? tipoRelacionado = null)
        {
            _tipoRelacionado = tipoRelacionado;
            ErrorMessage = "{0} deve ser informado.";
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
                return CriarErro(validationContext);

            if (value is string s && string.IsNullOrWhiteSpace(s))
                return CriarErro(validationContext);

            if (value is long id && id <= 0)
                return CriarErro(validationContext);

            // valida existência no banco
            if (value is long longId)
            {
                var session = (ISession?)validationContext.GetService(typeof(ISession));
                if (session == null)
                    return ValidationResult.Success;

                Type? tipo = _tipoRelacionado;

                // tenta deduzir se não foi informado
                if (tipo == null)
                {
                    string nomePropriedade = validationContext.MemberName ?? string.Empty;
                    if (nomePropriedade.EndsWith("Id", StringComparison.OrdinalIgnoreCase))
                    {
                        string nomeEntidade = nomePropriedade[..^2]; // remove "Id"

                        tipo = session.SessionFactory
                            .GetAllClassMetadata()
                            .Select(kv => kv.Value)
                            .Select(md => md.MappedClass)
                            .FirstOrDefault(t =>
                                t.Name.Equals(nomeEntidade, StringComparison.OrdinalIgnoreCase) ||
                                t.Name.EndsWith(nomeEntidade, StringComparison.OrdinalIgnoreCase));
                    }
                }

                // se conseguiu determinar o tipo, valida a existência
                if (tipo != null)
                {
                    var entidade = session.Get(tipo, longId);
                    if (entidade == null)
                        return new ValidationResult($"{NomeFormatado(tipo.Name)} com ID {longId} não encontrado.");
                }
            }

            return ValidationResult.Success;
        }

        private static ValidationResult CriarErro(ValidationContext ctx)
        {
            var nome = ctx.MemberName ?? "Campo";
            return new ValidationResult($"{NomeFormatado(nome)} deve ser informado.");
        }

        private static string NomeFormatado(string texto)
        {
            if (string.IsNullOrWhiteSpace(texto))
                return texto;

            if (texto.EndsWith("Id", StringComparison.OrdinalIgnoreCase))
                texto = texto[..^2];

            return char.ToUpper(texto[0]) + texto[1..];
        }
    }
}
