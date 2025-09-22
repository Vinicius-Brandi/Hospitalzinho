﻿using Hospitalzinho.Entidades.PacientePasta;
using System.ComponentModel.DataAnnotations;

namespace Hospitalzinho.Entidades.EspecificaçõesHospital;
public class ProfissionalSaude
{
    public virtual long Id { get; set; }
    public virtual string Nome { get; set; } = null!;
    [Required]
    public virtual string? RegistroProfissional { get; set; } // CRM, COREN etc.

    // FK
    [Required]
    public virtual Especialidade Especialidade { get; set; } = null!;

    // Relacionamentos
    public virtual List<PacienteConsulta> Consultas { get; set; } = new();
    public virtual List<Exame> ExamesSolicitados { get; set; } = new();
    public virtual List<PacienteInternacao> Internacoes { get; set; } = new();
    public virtual List<PacienteVacinacao> VacinacoesAdministradas { get; set; } = new();
    public virtual List<Receita> ReceitasPrescritas { get; set; } = new();
    public virtual HospitalUnidade Hospital { get; set; }
}
