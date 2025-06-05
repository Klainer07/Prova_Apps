const sequelize = require('./config/database');
const Usuario = require('./models/Usuario');
const Lista = require('./models/Lista');
const Item = require('./models/Item');

sequelize.sync({ alter: true }) 
  .then(() => console.log("Tabelas sincronizadas com sucesso."))
  .catch(err => console.error("Erro ao sincronizar:", err));
