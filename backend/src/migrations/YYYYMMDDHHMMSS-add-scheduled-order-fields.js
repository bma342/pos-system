'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('OrderProviders', 'handleScheduledOrders', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn('OrderProviders', 'scheduledOrderLeadTime', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 30,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('OrderProviders', 'handleScheduledOrders');
    await queryInterface.removeColumn('OrderProviders', 'scheduledOrderLeadTime');
  }
};