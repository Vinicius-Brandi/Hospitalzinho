namespace Hospitalzinho.Seguranca
{
    public class JwtSettings
    {
        public string Secret { get; set; }
        public int ExpiracaoHoras { get; set; } = 12;
        public string Emissor { get; set; }
        public string Audiencia { get; set; }
    }
}
