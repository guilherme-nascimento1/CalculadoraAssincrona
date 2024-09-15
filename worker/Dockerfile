# Etapa 1: Usar a imagem oficial do SDK do .NET para build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Definir o diretório de trabalho
WORKDIR /src

# Copiar o arquivo de projeto .csproj
COPY Worker/Worker.csproj ./Worker/

# Restaurar as dependências
RUN dotnet restore ./Worker/Worker.csproj

# Copiar o restante do código-fonte do projeto
COPY Worker/ ./Worker/

# Publicar o projeto com logs detalhados
RUN dotnet publish ./Worker/Worker.csproj -c Release -o /app --verbosity detailed

# Etapa 2: Usar a imagem runtime do .NET
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o build do stage anterior
COPY --from=build /app .

# Comando para rodar o worker
ENTRYPOINT ["dotnet", "Worker.dll"]
