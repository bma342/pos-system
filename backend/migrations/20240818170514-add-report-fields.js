'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Describe the 'Reports' table
    const tableInfo = await queryInterface.describeTable('Reports');

    // Add column if it does not exist
    if (!tableInfo.reportType) {
      await queryInterface.addColumn('Reports', 'reportType', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'sales',
      });
    }

    if (!tableInfo.generatedData) {
      await queryInterface.addColumn('Reports', 'generatedData', {
        type: Sequelize.JSONB,
        allowNull: false,
      });
    }

    if (!tableInfo.clientId) {
      await queryInterface.addColumn('Reports', 'clientId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }

    if (!tableInfo.locationId) {
      await queryInterface.addColumn('Reports', 'locationId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Reports', 'reportType');
    await queryInterface.removeColumn('Reports', 'generatedData');
    await queryInterface.removeColumn('Reports', 'clientId');
    await queryInterface.removeColumn('Reports', 'locationId');
  },
};
