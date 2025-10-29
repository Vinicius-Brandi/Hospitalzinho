# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia tudo
COPY . .

# Restaura e publica usando o caminho explícito para o .csproj
RUN dotnet restore Atualizado/HospitalzinhoAPI/HospitalzinhoAPI.csproj
RUN dotnet publish Atualizado/HospitalzinhoAPI/HospitalzinhoAPI.csproj -c Release -o /app/publish

# Etapa 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Exponha a porta (opcional)
EXPOSE 80

# Executa o projeto
ENTRYPOINT ["dotnet", "HospitalzinhoAPI.dll"]
