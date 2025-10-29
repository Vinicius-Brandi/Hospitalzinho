using FGB.Entidades;
using Hospitalzinho.Entidades;
using System.ComponentModel.DataAnnotations;

namespace Hospitalzinho.DTO.Get
{
    public class InternacaoDto : EntidadeBase
    {
        public string Paciente { get; set; }
        public string Quarto { get; set; }
        public string Hospital { get; set; }
        public string ProfResponsavel { get; set; }
        public string ProfRegistro { get; set; }
        public DateTime DataInternacao { get; set; }
        public DateTime? DataAlta { get; set; }
    }

    public class ConsultaDto : EntidadeBase
    {
        public string Paciente { get; set; }
        public DateTime DataConsulta { get; set; }
        public string ProfResponsavel { get; set; }
        public string ProfRegistro { get; set; }
        public string Hospital { get; set; }
        public string Observacoes { get; set; }
        public string Sala { get; set; }

        //public List<PacienteExame> Exames { get; set; } = new List<PacienteExame>();
    }

    public class CirurgiaDto : EntidadeBase
    {
        public string Paciente { get; set; }
        public string Nome { get; set; }
        public DateTime DataCirurgia { get; set; }
        public string ProfResponsavel { get; set; }
        public string ProfRegistro { get; set; }
        public string Sala { get; set; }
        public string Hospital { get; set; }
        public virtual string Observacoes { get; set; }
    }

    public class ExameDto : EntidadeBase
    {
        public string Paciente { get; set; }
        public DateTime DataExame { get; set; }
        public Exame tipoExame { get; set; } // Ex: "Sangue", "Raio-X"
        public string Laboratorio { get; set; }
        public string Resultados { get; set; }
        public string Observacoes { get; set; }
        public string ProfResponsavel { get; set; }
        public string ProfRegistro { get; set; }
        public string Hospital { get; set; }
    }

    public class VacinacaoDto : EntidadeBase
    {
        public string Paciente { get; set; }
        public string Vacina { get; set; }
        public string ProfResponsavel { get; set; }
        public string ProfRegistro { get; set; }
        public DateTime DataAplicacao { get; set; }
        public int DoseNumero { get; set; }
        public string Observacoes { get; set; }
        public string Hospital { get; set; }
    }
}
