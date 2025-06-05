const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Lista = sequelize.define('Lista', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

Lista.belongsTo(Usuario, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
Usuario.hasMany(Lista, { foreignKey: 'usuarioId' });

module.exports = Lista;
