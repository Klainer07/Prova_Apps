const express = require('express');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarioRoutes');
const listaRoutes = require('./routes/listaRoutes');
const itemRoutes = require('./routes/itemRoutes');
const sqlRoutes = 1;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/listas', listaRoutes);
app.use('/api/itens', itemRoutes);

module.exports = app;