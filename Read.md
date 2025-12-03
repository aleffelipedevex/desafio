# Instalação

# Projeto Application
- dotnet add package Microsoft.IdentityModel.Tokens --version 8.15.0 --project src/Application/Application.csproj

# Projeto Infrastructure
- dotnet add package BCrypt.Net-Next --version 4.0.3 --project src/Infrastructure/Infrastructure.csproj
- dotnet add package Microsoft.EntityFrameworkCore --version 9.0.0 --project src/Infrastructure/Infrastructure.csproj
- dotnet add package Microsoft.EntityFrameworkCore.Design --version 9.0.0 --project src/Infrastructure/Infrastructure.csproj
- dotnet add package Microsoft.IdentityModel.Tokens --version 8.15.0 --project src/Infrastructure/Infrastructure.csproj
- dotnet add package Pomelo.EntityFrameworkCore.MySql --version 9.0.0 --project src/Infrastructure/Infrastructure.csproj
- dotnet add package System.IdentityModel.Tokens.Jwt --version 8.15.0 --project src/Infrastructure/Infrastructure.csproj

# Projeto API
- dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.21 --project src/API/API.csproj
- dotnet add package Microsoft.AspNetCore.OpenApi --version 8.0.21 --project src/API/API.csproj
- dotnet add package Microsoft.EntityFrameworkCore.Design --version 9.0.0 --project src/API/API.csproj
- dotnet add package Microsoft.Extensions.Options --version 10.0.0 --project src/API/API.csproj
- dotnet add package StackExchange.Redis --version 2.10.1 --project src/API/API.csproj
- dotnet add package Swashbuckle.AspNetCore --version 6.6.2 --project src/API/API.csproj
- dotnet add package System.IdentityModel.Tokens.Jwt --version 8.15.0 --project src/API/API.csproj

# Run API
- dotnet run --project src/API

# Run Frontend
- path: src/Frontend
- npm run dev

# UP Containers Docker
- docker-compose up -d

# Banco de dados
- database: desafio
- user: desafio
- password: 123456

# Aessar Banco de Dados (phpmyadmin)
- http://localhost:8080
- user: desafio
- password: desafio

