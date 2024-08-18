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

    await addColumnIfNotExists('Clients', 'address', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });

    await addColumnIfNotExists('Clients', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Clients', 'address');
    await queryInterface.removeColumn('Clients', 'phoneNumber');
  }
};
