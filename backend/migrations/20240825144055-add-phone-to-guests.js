'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Guests');

    // Check if the "phone" column already exists
    if (!tableInfo.phone) {
      await queryInterface.addColumn('Guests', 'phone', {
        type: Sequelize.STRING,
        allowNull: true, // Adjust according to your requirements
      });
    }

    // Check if the "engagementScore" column already exists
    if (!tableInfo.engagementScore) {
      await queryInterface.addColumn('Guests', 'engagementScore', {
        type: Sequelize.INTEGER,
        allowNull: true, // Adjust according to your requirements
        defaultValue: 0,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Guests');

    // Only remove the column if it exists
    if (tableInfo.phone) {
      await queryInterface.removeColumn('Guests', 'phone');
    }

    if (tableInfo.engagementScore) {
      await queryInterface.removeColumn('Guests', 'engagementScore');
    }
  },
};
