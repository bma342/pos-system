'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Discounts', [
      {
        name: '10% Off Next Purchase',
        type: 'percentage',
        value: 10.0,
        cooldownPeriod: 168, // 1 week in hours
        maxUses
