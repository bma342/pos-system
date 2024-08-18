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
  await await addColumnIfNotExists('Clients', 'primaryColor', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '#3b82f6',
    });

    await await addColumnIfNotExists('Clients', 'secondaryColor', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '#1e40af',
    });

    await await addColumnIfNotExists('Clients', 'accentColor', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '#f59e0b',
    });

    await await addColumnIfNotExists('Clients', 'primaryFont', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Roboto, sans-serif',
    });

    await await addColumnIfNotExists('Clients', 'secondaryFont', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Open Sans, sans-serif',
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
