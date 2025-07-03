'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('listas', [
      {
        nome: 'Missões de Guts',
        descricao: 'Lista das batalhas e missões que Guts precisa completar.',
        usuarioId: 4, // Guts
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Objetivos do Espadachim Negro',
        descricao: 'Metas pessoais e desafios que Guts quer superar.',
        usuarioId: 4, // Guts
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Jornadas de Casca',
        descricao:
          'Tarefas e objetivos da guerreira para recuperar sua força e identidade.',
        usuarioId: 3, // Casca
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Itens e Equipamentos de Casca',
        descricao:
          'Lista dos equipamentos essenciais e artefatos mágicos para Casca.',
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
