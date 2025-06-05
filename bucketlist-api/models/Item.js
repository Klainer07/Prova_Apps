const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Lista = require('./Lista');

const Item = sequelize.define('Item', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.ENUM('Jogo', 'Livro', 'Filme', 'Viagem', 'Esporte', 'Outro'),
    defaultValue: 'Outro',
  },
  prioridade: {
    type: DataTypes.ENUM('Baixa', 'Média', 'Alta'),
    defaultValue: 'Média',
  },
  status: {
    type: DataTypes.ENUM('Pendente', 'Concluído'),
    defaultValue: 'Pendente',
  },
  prazo: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: true,
});

Item.belongsTo(Lista, { foreignKey: 'listaId', onDelete: 'CASCADE' });
Lista.hasMany(Item, { foreignKey: 'listaId' });

module.exports = Item;
