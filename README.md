# Prova02
Frontend e Backend do projeto da prova 2 de aplicativos corporativos

Estrutura do Projeto

/bucketlist-api

  └── setup.bat

/bucket

  └── bucketlist.bat
  

Para a instalação do App 


Backend




Pré-requisitos
Node.js instalado – https://nodejs.org

MySQL instalado e funcionando localmente

Editar o arquivo setup.bat e .env

Abra o arquivo setup.bat que está dentro da pasta bucketlist-api e verifique as seguintes variáveis de conexão com o banco de dados:

set DB_NAME=bucket
set DB_USER=root
set DB_PASS=1234
set DB_HOST=localhost

Abra o arquivo .env que está dentro da pasta bucketlist-api e verifique as seguintes variáveis de conexão com o banco de dados:

PORT=3000
DB_NAME=bucket
DB_USER=root
DB_PASS=1234
DB_HOST=localhost
JWT_SECRET=supersecreto

substituia para o valore do seu computador

Dê duplo clique no arquivo setup.bat ou execute no terminal:


.\setup.bat


Esse script irá:

Instalar as dependências do Node.js (npm install)

Criar o banco de dados no MySQL

Rodar as migrations e seeders com Sequelize

Iniciar o servidor backend (npm start)

Nas proximas inicializações somente o comando abaixo precisa ser executado


npm start


Frontend

Acesse a pasta bucketlist 

Execute o arquivo bucketlist.bat com um duplo clique ou via terminal:


.\bucketlist.bat


Esse script irá:

Instalar as dependências do frontend

Iniciar o servidor frontend com npm run dev

Nas proximas inicializações somente o comando abaixo precisa ser executado

npm run dev


Acessando o projeto
Frontend: http://localhost:5173

Backend (API): http://localhost:3000


(as portas podem variar se você alterá-las)





De Natã da Cruz Klein
