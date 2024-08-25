'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the column already exists before adding it
    const tableDescription = await queryInterface.describeTable('Guests');
    
    if (!tableDescription.engagementScore) {
      await queryInterface.addColumn('Guests', 'engagementScore', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Check if the column exists before attempting to remove it
    const tableDescription = await queryInterface.describeTable('Guests');

    if (tableDescription.engagementScore) {
      await queryInterface.removeColumn('Guests', 'engagementScore');
    }
  }
};

