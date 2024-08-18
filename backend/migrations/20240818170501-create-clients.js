'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
      },
      primaryColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '#3b82f6',
      },
      secondaryColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '#1e40af',
      },
      accentColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '#f59e0b',
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
