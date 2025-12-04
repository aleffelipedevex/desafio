# Instalação

# UP Containers Docker
- sudo apt update
- sudo apt install -y docker.io docker-compose
- sudo systemctl enable --now docker
- docker --version
- docker-compose --version
- docker-compose up -d

# Versão .NET 9 SDK

# Baixa o instalador
 - wget https://dot.net/v1/dotnet-install.sh -O dotnet-install.sh
 - chmod +x dotnet-install.sh

# Instala o SDK 9
- ./dotnet-install.sh --channel 9.0 --install-dir $HOME/dotnet

# Configura variáveis de ambiente
- export DOTNET_ROOT=$HOME/dotnet
- export PATH=$DOTNET_ROOT:$PATH

# Verifica instalação
- dotnet --list-sdks

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

# Variaveis de ambiente
- export JWT__KEY="b0228f6f35f3a0139552f851c83dccff93a7262c46bf10a83120cf1d18701ffb"
- export TMDB__BaseUrl="https://api.themoviedb.org/3/"
- export TMDB__ApiKey="7faf7d51482ea57cccd5304e3ac50413"

# Run API
- dotnet run --project src/API

# Run Frontend
- versão node 22 LTS
- path: src/Frontend
- npm install
- npm run dev

# Adicione um usuário via phpmyadmin
- INSERT INTO `Users` (
        `Id`, `Name`, `Email`, `PasswordHash`, `CreatedAt`, `RefreshToken`, `RefreshTokenExpiryTime`, `Role`
    ) VALUES (
        1,
        'Teste',
        'teste@teste.com',
        '$2a$11$NDHHdhjo9WQzkGJF1joH6.XjVJ1Fcp3Wam3aDF2apQDiDtcA1xYUe',
        NOW(),
        NULL,
        NULL,
        'User'
    );

# Banco de dados
- database: desafio
- user: root
- password: root

# Aessar Banco de Dados (phpmyadmin)
- http://localhost:8080
- user: desafio
- password: desafio

