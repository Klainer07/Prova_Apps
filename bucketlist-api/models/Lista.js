'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lista extends Model {
    static associate(models) {
      // Uma lista pertence a um usuário
      Lista.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario',
        onDelete: 'CASCADE',
      });

      // Uma lista tem muitos itens
      Lista.hasMany(models.Item, {
        foreignKey: 'listaId',
        as: 'itens',
        onDelete: 'CASCADE',
      });
    }
  }

  Lista.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        // trim não existe no Sequelize, trate no controller ou hook se precisar
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Lista',
      tableName: 'listas',
      timestamps: true,
    }
  );

  return Lista;
};
