'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('pass123', 10);
    
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Employee User',
        email: 'employee@example.com',
        password: hashedPassword,
        role: 'Requester',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Manager User',
        email: 'manager@example.com',
        password: hashedPassword,
        role: 'Validator',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      email: ['employee@example.com', 'manager@example.com']
    }, {});
  }
};