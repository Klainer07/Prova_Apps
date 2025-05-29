const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB conectado!');
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
    })
    .catch((err) => console.error('Erro ao conectar:', err));
