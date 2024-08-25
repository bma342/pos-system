'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('GlobalSettings', [
      {
        key: 'scheduled_order_handling',
        value: 'hold_until_ready', // Options: 'fire_immediately', 'hold_until_ready'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'annual_loyalty_reset',
        value: 'calendar_year', // Options: 'calendar_year', 'signup_anniversary'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('GlobalSettings', null, {});
  },
};
