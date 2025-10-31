using FGB.Dominio.Repositorios;
using FGB.IRepositorios;
using Hospitalzinho.Servico;
using NHibernate.Cfg;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.OData;

using NHSession = NHibernate.ISession;
using NHSessionFactory = NHibernate.ISessionFactory;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Configuração de JSON para ignorar ciclos de referência + habilitar OData
builder.Services.AddControllers()
    .AddOData(opt =>
        opt.Select()
           .Filter()
           .OrderBy()
           .Count()
           .Expand()
           .SetMaxTop(1000)) // permite $top até 1000 (ou remova o limite)
    .AddJsonOptions(opt =>
    {
        opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        opt.JsonSerializerOptions.DefaultIgnoreCondition =
            System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingDefault;
    });

// =======================================
// Configuração NHibernate
// =======================================
builder.Services.AddSingleton<NHSessionFactory>(factory =>
{
    var cfg = new Configuration();
    cfg.Configure(); // lê hibernate.cfg.xml na saída do build
    return cfg.BuildSessionFactory();
});

// Registrar NHibernate.ISession para injeção (scoped)
builder.Services.AddScoped<NHSession>(sp =>
    sp.GetRequiredService<NHSessionFactory>().OpenSession());

// Registrar RepositorioSessao para injeção de IRepositorioSessao
builder.Services.AddTransient<IRepositorioSessao, RepositorioSessao>();

// =======================================
// Injeção de dependência dos serviços
// =======================================
builder.Services.AddTransient<HospitalServico>();
builder.Services.AddTransient<HospitalUnidadeServico>();
builder.Services.AddTransient<PacienteServico>();
builder.Services.AddTransient<PacienteProntuarioServico>();
builder.Services.AddTransient<AlergiaServico>();
builder.Services.AddTransient<DoencaCronicaModeloServico>();
builder.Services.AddTransient<ExameServico>();
builder.Services.AddTransient<HospitalEnderecoServico>();
builder.Services.AddTransient<VacinaServico>();
builder.Services.AddTransient<VacinaModeloServico>();
builder.Services.AddTransient<ConvenioServico>();
builder.Services.AddTransient<EspecialidadeServico>();
builder.Services.AddTransient<ItemReceitaServico>();
builder.Services.AddTransient<ProfissionalSaudeServico>();
builder.Services.AddTransient<ReceitaServico>();
builder.Services.AddTransient<AlaServico>();
builder.Services.AddTransient<QuartoServico>();
builder.Services.AddTransient<SalaServico>();
builder.Services.AddTransient<MedicamentoServico>();
builder.Services.AddTransient<MedicamentoModeloServico>();
builder.Services.AddTransient<PacienteCirurgiaServico>();
builder.Services.AddTransient<PacienteConsultaServico>();
builder.Services.AddTransient<PacienteContatoServico>();
builder.Services.AddTransient<PacienteConvenioServico>();
builder.Services.AddTransient<PacienteDoencaCronicaServico>();
builder.Services.AddTransient<PacienteEnderecoServico>();
builder.Services.AddTransient<PacienteExameServico>();
builder.Services.AddTransient<PacienteInternacaoServico>();
builder.Services.AddTransient<PacienteMedicacaoServico>();
builder.Services.AddTransient<PacienteProntuarioServico>();

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// =======================================
// Configuração CORS para permitir qualquer origem (teste em rede local)
// =======================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// AutoMapper — corrigido para evitar MissingMethodException
builder.Services.AddAutoMapper(cfg =>
{
    cfg.AllowNullCollections = true;
}, AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Remover redirecionamento para HTTPS durante testes
// app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

// Mapear controllers
app.MapControllers();

// =======================================
// Teste rápido para conferir NHibernate
// =======================================
using (var scope = app.Services.CreateScope())
{
    var session = scope.ServiceProvider.GetRequiredService<NHSession>();
}

app.Run();
//app.Run("http://0.0.0.0:5102");
