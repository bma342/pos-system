'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Locations', 'outOfStockBehavior', {
      type: Sequelize.ENUM('grey', 'hide'),
      allowNull: false,
      defaultValue: 'grey',
    });
    await queryInterface.addColumn('Locations', 'inventoryResetTime', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Locations', 'outOfStockBehavior');
    await queryInterface.removeColumn('Locations', 'inventoryResetTime');
  }
};