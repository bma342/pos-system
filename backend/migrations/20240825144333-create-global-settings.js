'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the table already exists
    const tableExists = await queryInterface.sequelize.query(
      `SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'GlobalSettings'
      );`
    );

    if (!tableExists[0][0].exists) {
      // If the table does not exist, create it
      await queryInterface.createTable('GlobalSettings', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        key: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        value: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    } else {
      // If the table exists, check if columns need to be added
      const tableDescription = await queryInterface.describeTable('GlobalSettings');

      if (!tableDescription.key) {
        await queryInterface.addColumn('GlobalSettings', 'key', {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        });
      }

      if (!tableDescription.value) {
        await queryInterface.addColumn('GlobalSettings', 'value', {
          type: Sequelize.STRING,
          allowNull: false,
        });
      }

      if (!tableDescription.createdAt) {
        await queryInterface.addColumn('GlobalSettings', 'createdAt', {
          type: Sequelize.DATE,
          allowNull: false,
        });
      }

      if (!tableDescription.updatedAt) {
        await queryInterface.addColumn('GlobalSettings', 'updatedAt', {
          type: Sequelize.DATE,
          allowNull: false,
        });
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Optional: Decide if you want to drop the table on rollback
    await queryInterface.dropTable('GlobalSettings');
  },
};

