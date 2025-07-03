'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const senhaKlein = await bcrypt.hash('12345678', 10);
    const senhaAdmin = await bcrypt.hash('admin123', 10);
    const senhaCasca = await bcrypt.hash('casca123', 10);
    const senhaGuts = await bcrypt.hash('guts123', 10);

    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Klein',
        email: 'klein@gmail.com',
        senha: senhaKlein,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Admin',
        email: 'admin@gmail.com',
        senha: senhaAdmin,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Casca',
        email: 'casca@falcon.com',
        senha: senhaCasca,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Guts',
        email: 'guts@berserk.com',
        senha: senhaGuts,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  },
};
