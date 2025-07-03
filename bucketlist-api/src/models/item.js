'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.Lista, {
        foreignKey: 'listaId',
        as: 'lista',
        onDelete: 'CASCADE',
      });
    }
  }

  Item.init(
    {
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoria: {
        type: DataTypes.ENUM(
          'Jogo',
          'Livro',
          'Filme',
          'Viagem',
          'Esporte',
          'Outro'
        ),
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
        allowNull: true,
      },
      listaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'listas',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Item',
      tableName: 'itens',
      timestamps: true,
    }
  );

  return Item;
};
