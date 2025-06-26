@echo off
setlocal enabledelayedexpansion

:: Configurações do banco de dados
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
:: Usar CALL para garantir que o script de lote aguarde a conclusão do npx sequelize-cli db:migrate
CALL npx sequelize-cli db:migrate

IF %ERRORLEVEL% NEQ 0 (
    echo Erro ao rodar as migrations.
    pause
    exit /b
)

echo Migrations rodadas com sucesso.

echo Rodando seeders...
:: Usar CALL para garantir que o script de lote aguarde a conclusão do npx sequelize-cli db:seed:all
CALL npx sequelize-cli db:seed:all

IF %ERRORLEVEL% NEQ 0 (
    echo Erro ao rodar os seeders.
    pause
    exit /b
)

echo Seeders rodados com sucesso.

echo Iniciando a aplicação...
npm start

:: Se npm start iniciar um servidor que não retorna o controle,
:: o script irá pausar após a aplicação ser iniciada e não terminar.
:: Você pode remover 'pause' se quiser que o script termine quando 'npm start' for fechado.
pause