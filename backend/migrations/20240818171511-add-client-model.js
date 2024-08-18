'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
  const addColumnIfNotExists = async (table, column, type) => {
    const tableExists = await queryInterface.tableExists(table);
    if (tableExists) {
      const columns = await queryInterface.describeTable(table);
      if (!columns[column]) {
        await await addColumnIfNotExists(table, column, type);
      }
    }
  };
  await queryInterface.createTable('Clients', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      subdomain: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[a-zA-Z0-9-]+$/, // Only allow valid subdomains
        },
      },
      primaryColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '#3b82f6', // Default blue color
      },
      secondaryColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '#1e40af', // Default darker blue color
      },
      accentColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '#f59e0b', // Default amber color
      },
      primaryFont: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Roboto, sans-serif',
      },
      secondaryFont: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Open Sans, sans-serif',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clients');
  },
};
