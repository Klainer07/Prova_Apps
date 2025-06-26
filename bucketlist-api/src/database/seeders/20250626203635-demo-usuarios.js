'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const senhaCriptografada = await bcrypt.hash('12345678', 10);
    const senhaAdmin = await bcrypt.hash('admin123', 10);

    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Klein',
        email: 'klein@gmail.com',
        senha: senhaCriptografada,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Admin',
        email: 'admin@gmail.com',
        senha: senhaAdmin,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
