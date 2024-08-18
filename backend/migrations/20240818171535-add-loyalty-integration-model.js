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
  await queryInterface.createTable('LoyaltyIntegrations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      locationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Locations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      provider: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apiKey: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      settings: {
        type: Sequelize.JSONB,
        allowNull: true,
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
    await queryInterface.dropTable('LoyaltyIntegrations');
  },
};
