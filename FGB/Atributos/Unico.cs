using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using NHibernate;

namespace FGB.Dominio.Atributos
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class UnicoAttribute : ValidationAttribute
    {
        private readonly Type? _tipoEntidade;

        public UnicoAttribute(Type? tipoEntidade = null)
        {
            _tipoEntidade = tipoEntidade;
            ErrorMessage = "{0} já está em uso.";
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
                return ValidationResult.Success;

            var session = (ISession?)validationContext.GetService(typeof(ISession));
            if (session == null)
                return ValidationResult.Success;

            var tipo = _tipoEntidade ?? validationContext.ObjectType;
            var nomePropriedade = validationContext.MemberName ?? string.Empty;

            // Recupera o ID atual (para ignorar o próprio registro)
            var propId = validationContext.ObjectType.GetProperty("Id", BindingFlags.Public | BindingFlags.Instance);
            var idAtual = propId?.GetValue(validationContext.ObjectInstance) as long?;

            // === Criar a query base dinamicamente ===
            var metodoQuery = typeof(ISession)
                .GetMethods()
                .First(m => m.Name == "Query" && m.IsGenericMethod && m.GetParameters().Length == 0)
                .MakeGenericMethod(tipo);

            var query = metodoQuery.Invoke(session, null) as IQueryable;

            // === Cria expressão x => x.NomePropriedade == value ===
            var param = Expression.Parameter(tipo, "x");
            var prop = Expression.Property(param, nomePropriedade);
            var constante = Expression.Constant(value);
            var igualdade = Expression.Equal(prop, constante);
            var lambda = Expression.Lambda(igualdade, param);

            var metodoWhere = typeof(Queryable)
                .GetMethods()
                .First(m => m.Name == "Where" && m.GetParameters().Length == 2)
                .MakeGenericMethod(tipo);

            var queryFiltrada = (IQueryable)metodoWhere.Invoke(null, new object[] { query!, lambda })!;

            // === Ignorar o próprio registro (id != idAtual) ===
            if (idAtual.HasValue)
            {
                var propIdEntidade = tipo.GetProperty("Id", BindingFlags.Public | BindingFlags.Instance);
                if (propIdEntidade != null)
                {
                    var param2 = Expression.Parameter(tipo, "x");
                    var propIdExpr = Expression.Property(param2, propIdEntidade);
                    var constId = Expression.Constant(idAtual.Value);
                    var diffExpr = Expression.NotEqual(propIdExpr, constId);
                    var lambdaDiff = Expression.Lambda(diffExpr, param2);

                    var metodoWhere2 = typeof(Queryable)
                        .GetMethods()
                        .First(m => m.Name == "Where" && m.GetParameters().Length == 2)
                        .MakeGenericMethod(tipo);

                    queryFiltrada = (IQueryable)metodoWhere2.Invoke(null, new object[] { queryFiltrada, lambdaDiff })!;
                }
            }

            // === Verifica se já existe ===
            var metodoAny = typeof(Queryable)
                .GetMethods()
                .First(m => m.Name == "Any" && m.GetParameters().Length == 1)
                .MakeGenericMethod(tipo);

            bool existe = (bool)metodoAny.Invoke(null, new object[] { queryFiltrada })!;

            if (existe)
            {
                string nomeCampo = validationContext.DisplayName ?? nomePropriedade;
                return new ValidationResult(string.Format(ErrorMessage!, nomeCampo));
            }

            return ValidationResult.Success;
        }
    }
}
