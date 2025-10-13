using Hospitalzinho.Servico;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Configura��o de JSON para ignorar ciclos de refer�ncia
builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

// Inje��o de depend�ncia dos servi�os
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
