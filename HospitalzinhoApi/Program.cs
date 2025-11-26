using FGB.Dominio.Repositorios;
using FGB.IRepositorios;
using Hospitalzinho.Seguranca;
using Hospitalzinho.Servico;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.OData;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using NHibernate.Cfg;
using System;
using System.Text;
using System.Text.Json.Serialization;
using NHSession = NHibernate.ISession;
using NHSessionFactory = NHibernate.ISessionFactory;

var builder = WebApplication.CreateBuilder(args);

// =======================================
// CONFIGURAÇÕES DE JWT
// =======================================

// Lê JwtSettings do appsettings.json
builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("JwtSettings")
);

builder.Services.AddScoped<JwtService>();

var jwt = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();
var key = Encoding.UTF8.GetBytes(jwt.Secret);

// Configuração de autenticação JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwt.Emissor,
        ValidAudience = jwt.Audiencia,
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

builder.Services.AddAuthorization();


// =======================================
// Configuração de CONTROLLERS + JSON + ODATA
// =======================================
builder.Services.AddControllers()
    .AddOData(opt =>
        opt.Select().Filter().OrderBy().Count().Expand().SetMaxTop(1000))
    .AddJsonOptions(opt =>
    {
        opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        opt.JsonSerializerOptions.DefaultIgnoreCondition =
            JsonIgnoreCondition.WhenWritingDefault;
    });

// =======================================
// NHIBERNATE
// =======================================
builder.Services.AddSingleton<NHSessionFactory>(factory =>
{
    var cfg = new Configuration();
    cfg.Configure(); // lê hibernate.cfg.xml
    return cfg.BuildSessionFactory();
});

builder.Services.AddScoped<NHSession>(sp =>
    sp.GetRequiredService<NHSessionFactory>().OpenSession());

builder.Services.AddTransient<IRepositorioSessao, RepositorioSessao>();

// =======================================
// Serviços do Hospitalzinho
// =======================================
builder.Services.AddTransient<HospitalServico>();
builder.Services.AddTransient<HospitalUnidadeServico>();
builder.Services.AddTransient<PacienteServico>();
builder.Services.AddTransient<PacienteAlergiaServico>();
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
builder.Services.AddTransient<LeitoServico>();
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
builder.Services.AddTransient<PacienteVacinacaoServico>();

// =======================================
// Swagger
// =======================================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// =======================================
// CORS
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

// =======================================
// AutoMapper
// =======================================
builder.Services.AddAutoMapper(cfg =>
{
    cfg.AllowNullCollections = true;
}, AppDomain.CurrentDomain.GetAssemblies());


// =======================================
// BUILD APP
// =======================================
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

// JWT (obrigatório: vem antes do MapControllers)
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Rodar em todas interfaces (ex: para docker)
app.Run();

//app.Run("http://0.0.0.0:5102");
