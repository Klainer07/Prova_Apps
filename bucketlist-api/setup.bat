@echo off
setlocal enabledelayedexpansion

echo Instalando dependências do Node.js...

CALL npm install

IF %ERRORLEVEL% NEQ 0 (
    echo Erro ao instalar as dependências. Verifique sua conexão ou o package.json.
    pause
    exit /b
)

echo Dependências instaladas com sucesso.


set DB_NAME=bucket
set DB_USER=root
set DB_PASS=123456
set DB_HOST=localhost

echo Criando banco de dados %DB_NAME%...

mysql -u%DB_USER% -p%DB_PASS% -h %DB_HOST% -e "CREATE DATABASE IF NOT EXISTS %DB_NAME% CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

IF %ERRORLEVEL% NEQ 0 (
    echo Erro ao criar o banco de dados. Verifique as credenciais do MySQL.
    pause
    exit /b
)

echo Banco de dados %DB_NAME% criado com sucesso.

echo Rodando migrations...

CALL npx sequelize-cli db:migrate

IF %ERRORLEVEL% NEQ 0 (
    echo Erro ao rodar as migrations.
    pause
    exit /b
)

echo Migrations rodadas com sucesso.

echo Rodando seeders...

CALL npx sequelize-cli db:seed:all

IF %ERRORLEVEL% NEQ 0 (
    echo Erro ao rodar os seeders.
    pause
    exit /b
)

echo Seeders rodados com sucesso.

echo Iniciando a aplicação...
npm start


pause