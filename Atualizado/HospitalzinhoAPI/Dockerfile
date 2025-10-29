# Imagem base oficial do .NET SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copia tudo para dentro do container
COPY . ./

# Restaura e publica a aplicação
RUN dotnet publish -c Release -o out

# Cria a imagem final a partir da base de runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Expõe a porta padrão
EXPOSE 80

# Comando para rodar a API
ENTRYPOINT ["dotnet", "HospitalzinhoApi.dll"]
