'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Clients', 'primaryColor', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '#3b82f6'
    });
    await queryInterface.addColumn('Clients', 'secondaryColor', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '#1e40af'
    });
    await queryInterface.addColumn('Clients', 'accentColor', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '#f59e0b'
    });
    await queryInterface.addColumn('Clients', 'primaryFont', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Roboto, sans-serif'
    });
    await queryInterface.addColumn('Clients', 'secondaryFont', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Open Sans, sans-serif'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Clients', 'primaryColor');
    await queryInterface.removeColumn('Clients', 'secondaryColor');
    await queryInterface.removeColumn('Clients', 'accentColor');
    await queryInterface.removeColumn('Clients', 'primaryFont');
    await queryInterface.removeColumn('Clients', 'secondaryFont');
  }
};
