'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the 'MenuItems' table exists
    const tableDefinition = await queryInterface.describeTable('MenuItems');

    // If the 'image' column does not exist, add it
    if (!tableDefinition.image) {
      await queryInterface.addColumn('MenuItems', 'image', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    } else {
      console.log("Column 'image' already exists in 'MenuItems' table. Skipping.");
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Check if the 'image' column exists before trying to remove it
    const tableDefinition = await queryInterface.describeTable('MenuItems');

    if (tableDefinition.image) {
      await queryInterface.removeColumn('MenuItems', 'image');
    } else {
      console.log("Column 'image' does not exist in 'MenuItems' table. Skipping removal.");
    }
  },
};

