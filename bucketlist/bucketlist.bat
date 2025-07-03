@echo off
echo Instalando dependências com npm install...
CALL npm install

if %errorlevel% neq 0 (
    echo Erro ao instalar as dependências.
    pause
    exit /b %errorlevel%
)

echo Iniciando o servidor com npm run dev...
CALL npm run dev

pause
