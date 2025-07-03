
# 📦 BucketList App – Prova 02
Frontend e Backend do projeto da prova 2 de Aplicativos Corporativos  
**Autor:** Natã da Cruz Klein

---

## 📝 Descrição do Projeto

Este aplicativo permite que os usuários criem e gerenciem uma **bucket list** – uma lista de metas, sonhos e atividades que desejam realizar ao longo da vida. A aplicação é dividida entre:

- **Backend:** API REST com Node.js, Express e MySQL
- **Frontend:** Aplicação React com Vite

---

## 🚀 Funcionalidades

### ✅ Backend (API)
- Criar, listar, editar e remover itens da bucket list
- Categorizar itens (ex: viagens, livros, filmes, jogos, experiências)
- Marcar itens como **pendente** ou **concluído**
- Usar prioridades e prazos
- Autenticação com JWT

### 🌐 Endpoints principais
| Método | Rota                   | Descrição                      |
|--------|------------------------|-------------------------------|
| GET    | `/items`              | Lista todos os itens          |
| POST   | `/items`              | Cria um novo item             |
| PUT    | `/items/:id`          | Edita um item                 |
| DELETE | `/items/:id`          | Remove um item                |
| POST   | `/auth/login`         | Login do usuário              |
| POST   | `/auth/register`      | Registro de novo usuário      |

---

## 📂 Estrutura do Projeto

```
/bucketlist-api
  ├── setup.bat
  ├── .env
  └── src/...

/bucketlist
  └── bucketlist.bat
```

---

## 🧰 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Dotenv](https://github.com/motdotla/dotenv)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---

## ⚙️ Requisitos

- [Node.js](https://nodejs.org)
- MySQL instalado e em execução localmente

---

## 📦 Instalação e Execução

### 🔧 Backend

1. Acesse a pasta `bucketlist-api`
2. **Edite o arquivo `setup.bat`**, ajustando as variáveis do banco:
```bat
set DB_NAME=bucket
set DB_USER=root
set DB_PASS=1234
set DB_HOST=localhost
```

3. **Edite também o arquivo `.env`**:
```
PORT=3000
DB_NAME=bucket
DB_USER=root
DB_PASS=1234
DB_HOST=localhost
JWT_SECRET=supersecreto
```

> Substitua os valores acima conforme sua configuração local.

4. Execute o script:
```bash
.\setup.bat
```

Esse script irá:
- Instalar dependências (`npm install`)
- Criar o banco de dados automaticamente
- Rodar migrations e seeders (`npx sequelize-cli`)
- Iniciar o servidor (`npm start`)

➡️ **Nas próximas execuções, use apenas:**
```bash
npm start
```

---

### 🖥️ Frontend

1. Acesse a pasta `bucketlist`
2. Execute o script:
```bash
.ucketlist.bat
```

Esse script irá:
- Instalar as dependências (`npm install`)
- Iniciar o frontend com:
```bash
npm run dev
```

➡️ **Nas próximas execuções, use apenas:**
```bash
npm run dev
```

---

## 🔗 Acessando o Projeto

- **Frontend:** http://localhost:5173  
- **Backend (API):** http://localhost:3000  

> As portas podem variar conforme o conteúdo do `.env` ou configuração do seu sistema



## ✅ Conclusão

Este projeto foi desenvolvido como parte da avaliação da disciplina **Aplicativos Corporativos**, com foco na construção de uma aplicação full-stack com integração entre frontend e backend.

---

---

## 📥 Alternativa: Instalação Manual via Terminal

Caso não deseje usar os arquivos `.bat`, siga os passos abaixo:

### 🔁 Clone o repositório

```bash
git clone https://github.com/Klainer07/Prova_Apps.git
cd Prova_Apps/bucketlist-api
```

### 📦 Instale as dependências

```bash
npm install
```

### ⚙️ Configure o ambiente

Crie o arquivo `.env` com base nas configurações abaixo:

```
PORT=3000
DB_NAME=bucket
DB_USER=root
DB_PASS=1234
DB_HOST=localhost
JWT_SECRET=supersecreto
```

### 🗃️ Configure o banco de dados

Certifique-se de que o MySQL está rodando e execute os seguintes comandos para criar o banco de dados:

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS bucket CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### 🚀 Inicie a aplicação

```bash
npm start
```

---
### 🌐 Inicie o Frontend

Abra outro terminal e execute:

```bash
cd ../bucketlist
npm install
npm run dev