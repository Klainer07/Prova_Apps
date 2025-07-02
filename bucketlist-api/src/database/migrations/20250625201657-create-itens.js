'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('itens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoria: {
        type: Sequelize.ENUM('Jogo', 'Livro', 'Filme', 'Viagem', 'Esporte', 'Outro'),
        defaultValue: 'Outro',
      },
      prioridade: {
        type: Sequelize.ENUM('Baixa', 'Média', 'Alta'),
        defaultValue: 'Média',
      },
      status: {
        type: Sequelize.ENUM('Pendente', 'Concluído'),
        defaultValue: 'Pendente',
      },
      prazo: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      listaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'listas',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('itens');
  },
};
