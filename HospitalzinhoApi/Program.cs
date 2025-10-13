using Hospitalzinho.Servico;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Configuração de JSON para ignorar ciclos de referência
builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

// Injeção de dependência dos serviços
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

app.Run();
