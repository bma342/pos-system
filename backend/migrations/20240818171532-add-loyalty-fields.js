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

    await addColumnIfNotExists('Clients', 'loyaltyPoints', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });

    await addColumnIfNotExists('Clients', 'loyaltyTier', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Bronze',
    });

    await addColumnIfNotExists('Clients', 'loyaltySubscription', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Clients', 'loyaltyPoints');
    await queryInterface.removeColumn('Clients', 'loyaltyTier');
    await queryInterface.removeColumn('Clients', 'loyaltySubscription');
  }
};
