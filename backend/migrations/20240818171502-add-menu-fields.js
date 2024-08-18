'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const addColumnIfNotExists = async (table, column, type) => {
      const tableExists = await queryInterface.tableExists(table);
      if (tableExists) {
        const columns = await queryInterface.describeTable(table);
        if (!columns[column]) {
          await queryInterface.addColumn(table, column, type);
        }
      }
    };

    await addColumnIfNotExists('Clients', 'upliftPercentage', {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    });

    await addColumnIfNotExists('Clients', 'providerUplifts', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: {},
    });

    await addColumnIfNotExists('Clients', 'roundingEnabled', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Clients', 'upliftPercentage');
    await queryInterface.removeColumn('Clients', 'providerUplifts');
    await queryInterface.removeColumn('Clients', 'roundingEnabled');
  }
};
