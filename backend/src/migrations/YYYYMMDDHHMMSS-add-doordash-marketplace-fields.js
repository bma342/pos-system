'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('OrderProviders', 'doordashStoreId', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('OrderProviders', 'doordashMerchantId', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('OrderProviders', 'doordashApiKey', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('OrderProviders', 'isDoordashMenuSyncEnabled', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn('OrderProviders', 'isDoordashAutoAcceptEnabled', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('OrderProviders', 'doordashStoreId');
    await queryInterface.removeColumn('OrderProviders', 'doordashMerchantId');
    await queryInterface.removeColumn('OrderProviders', 'doordashApiKey');
    await queryInterface.removeColumn('OrderProviders', 'isDoordashMenuSyncEnabled');
    await queryInterface.removeColumn('OrderProviders', 'isDoordashAutoAcceptEnabled');
  }
};