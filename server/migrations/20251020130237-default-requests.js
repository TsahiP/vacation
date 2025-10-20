'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('VacationRequests', [
      {
        userId: 1, // Employee User
        startDate: '2025-11-01',
        endDate: '2025-11-05',
        reason: 'Annual leave',
        status: 'Pending',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        userId: 1, // Employee User
        startDate: '2025-12-24',
        endDate: '2025-12-31',
        reason: 'Winter holidays',
        status: 'Approved',
        comments: 'Approved in advance',
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)  // 5 days ago
      },
      {
        userId: 1, // Employee User
        startDate: '2025-10-10',
        endDate: '2025-10-12',
        reason: 'Personal leave',
        status: 'Rejected',
        comments: 'Critical project deadline during this period',
        created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
        updated_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)  // 12 days ago
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('VacationRequests', null, {});
  }
};