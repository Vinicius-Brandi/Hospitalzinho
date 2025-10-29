# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia os arquivos da solução
COPY . .

# Restaura e publica a API
WORKDIR /src/Atualizado/HospitalzinhoAPI
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# Etapa 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Exponha a porta padrão (opcional, só informativo)
EXPOSE 80

# Comando de entrada
ENTRYPOINT ["dotnet", "HospitalzinhoAPI.dll"]
