using Hospitalzinho.Servico;
using FGB.IRepositorios;
using FGB.Dominio.Repositorios;
using NHibernate;
using NHibernate.Cfg;
using System.Text.Json.Serialization;

// Alias para evitar conflito de ISession
using NHSession = NHibernate.ISession;
using NHSessionFactory = NHibernate.ISessionFactory;
using Hospital = Hospitalzinho.Entidades.Hospital;

var builder = WebApplication.CreateBuilder(args);

// Configura��o de JSON para ignorar ciclos de refer�ncia
builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

// =======================================
// Configura��o NHibernate
// =======================================
builder.Services.AddSingleton<NHSessionFactory>(factory =>
{
    var cfg = new Configuration();
    cfg.Configure(); // l� hibernate.cfg.xml na sa�da do build
    return cfg.BuildSessionFactory();
});

// Registrar NHibernate.ISession para inje��o (scoped)
builder.Services.AddScoped<NHSession>(sp =>
    sp.GetRequiredService<NHSessionFactory>().OpenSession());

// Registrar RepositorioSessao para inje��o de IRepositorioSessao
builder.Services.AddTransient<IRepositorioSessao, RepositorioSessao>();

// =======================================
// Inje��o de depend�ncia dos servi�os
// =======================================
builder.Services.AddTransient<HospitalServico>();
builder.Services.AddTransient<HospitalUnidadeServico>();
builder.Services.AddTransient<PacienteServico>();
builder.Services.AddTransient<PacienteProntuarioServico>();
// Novos servi\u00e7os adicionados para entidades diversas
builder.Services.AddTransient<ConvenioServico>();
builder.Services.AddTransient<EspecialidadeServico>();
builder.Services.AddTransient<ItemReceitaServico>();
builder.Services.AddTransient<ProfissionalSaudeServico>();
builder.Services.AddTransient<ReceitaServico>();

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

// Mapear controllers
app.MapControllers();

// =======================================
// Teste r�pido para conferir NHibernate
// =======================================
using (var scope = app.Services.CreateScope())
{
    var session = scope.ServiceProvider.GetRequiredService<NHSession>();
    var list = session.Query<Hospital>().ToList();
    Console.WriteLine($"Total hospitais cadastrados: {list.Count}");
}

app.Run();
