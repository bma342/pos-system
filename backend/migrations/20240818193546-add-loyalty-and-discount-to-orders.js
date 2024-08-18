'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'serviceFee', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
    await queryInterface.addColumn('Orders', 'tipAmount', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
    await queryInterface.addColumn('Orders', 'loyaltyPointsUsed', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
    await queryInterface.addColumn('Orders', 'discountApplied', {
      type: Sequelize.FLOAT,
      defaultValue: 0.0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'serviceFee');
    await queryInterface.removeColumn('Orders', 'tipAmount');
    await queryInterface.removeColumn('Orders', 'loyaltyPointsUsed');
    await queryInterface.removeColumn('Orders', 'discountApplied');
  }
};
