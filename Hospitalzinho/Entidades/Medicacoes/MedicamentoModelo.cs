using FGB.Dominio.Atributos;
using FGB.Entidades;

namespace Hospitalzinho.Entidades
{
    public class MedicamentoModelo : EntidadeBase
    {
        [Obrigar]
        public virtual string Nome { get; set; } // Ex: "Losartana 50mg"
        public virtual string? PrincipioAtivo { get; set; } // Ex: "Losartana Potássica"
        public virtual string? Fabricante { get; set; }
        public virtual string? FormaFarmaceutica { get; set; } // Comprimido, Cápsula, Xarope
        public virtual string? Dosagem { get; set; } // Ex: "50mg"
        public virtual string? Indicacoes { get; set; }
        public virtual string? ContraIndicacoes { get; set; }
    }
}
