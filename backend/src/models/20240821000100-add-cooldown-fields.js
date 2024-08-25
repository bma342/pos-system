'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Discounts', 'cooldownPeriod', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Discounts', 'lastUsedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Discounts', 'cooldownPeriod');
    await queryInterface.removeColumn('Discounts', 'lastUsedAt');
  }
};
