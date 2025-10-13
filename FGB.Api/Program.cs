using Microsoft.AspNetCore.OData; // Necessário para AddOData e EnableQuery
using Microsoft.OData.ModelBuilder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// -------------------------------------
// 🔧 Configuração dos Controllers + OData
// -------------------------------------
builder.Services.AddControllers().AddOData(options =>
{
    // Permissões de query OData
    options.Select()   // habilita $select
           .Filter()   // habilita $filter
           .OrderBy()  // habilita $orderby
           .Expand()   // habilita $expand
           .Count()    // habilita $count
           .SetMaxTop(100); // limita o número máximo de registros retornados
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
