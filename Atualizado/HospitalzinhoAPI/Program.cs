using HospitalzinhoAPI.Data;
using HospitalzinhoAPI.Mappings;
using HospitalzinhoAPI.Services.Hospital;
using HospitalzinhoAPI.Services.Paciente;
using HospitalzinhoAPI.Services.Prontuario;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// ===============================================
// 🔧 CONFIGURAÇÃO DE SERVIÇOS
// ===============================================

// Controladores (Controllers)
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Evita problemas com serialização de enums ou loops de referência
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

// Swagger (documentação da API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Serviços (injeção de dependência)
builder.Services.AddScoped<IPacienteInterface, PacienteService>();
builder.Services.AddScoped<IHospitalInterface, HospitalService>();
builder.Services.AddScoped<IProntuarioInterface, ProntuarioService>();

// AutoMapper (mapeamento entre DTOs e entidades)
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Banco de dados
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// ===============================================
// 🌐 CONFIGURAÇÃO DE CORS (Cross-Origin Resource Sharing)
// ===============================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontendReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // endereço do seu front-end React
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ===============================================
// 🚀 CONSTRUÇÃO E EXECUÇÃO DO APP
// ===============================================
var app = builder.Build();

// Middleware de desenvolvimento (Swagger)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Redireciona HTTP → HTTPS
app.UseHttpsRedirection();

// Aplica a política de CORS (deve vir antes de Authorization)
app.UseCors("PermitirFrontendReact");

app.UseAuthorization();

app.MapControllers();

app.Run();
