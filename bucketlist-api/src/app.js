const express = require('express');
const cors = require('cors');
const helmet = require('helmet')

const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const listaRoutes = require('./routes/listaRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();


app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/listas', listaRoutes);
app.use('/api/itens', itemRoutes);

module.exports = app;
