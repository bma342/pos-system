'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Locations', 'defaultPrepTime', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 15,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Locations', 'defaultPrepTime');
  }
};