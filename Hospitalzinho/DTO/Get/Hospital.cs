using FGB.Dominio.Interfaces;
using FGB.Entidades;

public class HospitalDto : EntidadeBase
{
    public string Nome { get; set; } = string.Empty;
    public string CNES { get; set; } = string.Empty;
    public string CNPJ { get; set; } = string.Empty;
    public string TokenAcesso { get; set; } = string.Empty;
    public List<HospitalUnidadeDto> Unidades { get; set; } = new();
}

public class HospitalUnidadeDto : EntidadeBase
{
    public string Nome { get; set; } = string.Empty;
    public string TipoUnidade { get; set; } = string.Empty;
    public string Endereco { get; set; } = string.Empty;
}
