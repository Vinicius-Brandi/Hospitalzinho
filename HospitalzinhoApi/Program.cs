using Hospitalzinho.Servico;
using FGB.IRepositorios;
using FGB.Repositorio;
using NHibernate;
using NHibernate.Cfg;
using System.Text.Json.Serialization;

// Alias para evitar conflito de ISession
using NHSession = NHibernate.ISession;
using NHSessionFactory = NHibernate.ISessionFactory;
using Hospital = Hospitalzinho.Entidades.EspecificaçõesHospital.Hospital;

var builder = WebApplication.CreateBuilder(args);

// Configuração de JSON para ignorar ciclos de referência
builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
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
// Teste rápido para conferir NHibernate
// =======================================
//using (var scope = app.Services.CreateScope())
//{
//    var session = scope.ServiceProvider.GetRequiredService<NHSession>();
//    var list = session.Query<Hospital>().ToList();
//    Console.WriteLine($"Total hospitais cadastrados: {list.Count}");
//}

app.Run();
