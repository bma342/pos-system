'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('MenuItems', 'prepTime', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
    await queryInterface.addColumn('MenuItems', 'onlineInventoryOffset', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('MenuItems', 'prepTime');
    await queryInterface.removeColumn('MenuItems', 'onlineInventoryOffset');
  }
};