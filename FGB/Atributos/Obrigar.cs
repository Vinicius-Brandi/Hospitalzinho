using System.ComponentModel.DataAnnotations;


namespace FGB.Dominio.Atributos
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class ObrigarAttribute : RequiredAttribute
    {
        public ObrigarAttribute()
        {
            ErrorMessage = "{0} deve ser informado.";
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value != null && !(value is string s && string.IsNullOrWhiteSpace(s)))
                return ValidationResult.Success;

            string nomePropriedade = validationContext.MemberName ?? "Campo";
            if (nomePropriedade.EndsWith("id", StringComparison.OrdinalIgnoreCase))
                nomePropriedade = nomePropriedade.Substring(0, nomePropriedade.Length - 2);

            // Formata a mensagem final
            string mensagem = $"{PrimeiraMaiuscula(nomePropriedade)} deve ser informado.";

            return new ValidationResult(mensagem);
        }

        private string PrimeiraMaiuscula(string texto)
        {
            if (string.IsNullOrEmpty(texto))
                return texto;

            return char.ToUpper(texto[0]) + texto.Substring(1);
        }
    }
}
