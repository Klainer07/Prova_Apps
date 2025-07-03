'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('listas', [
      {
        nome: 'Missões de Guts',
        descricao: 'GRIFFITHHHHHH',
        usuarioId: 4, // Guts
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Objetivos do Espadachim Negro',
        descricao: 'Como o Guts vai sofrer nesta semana.',
        usuarioId: 4, // Guts
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Jornadas de Casca',
        descricao:
          'Ao redor do mundo e outros mundos.',
        usuarioId: 3, // Casca
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Memorias da Casca',
        descricao:'Coisas que possam recuperar as memórias',
        usuarioId: 3, // Casca
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'listas',
      {
        usuarioId: { [Sequelize.Op.in]: [3, 4] },
      },
      {}
    );
  },
};
