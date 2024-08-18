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
  await queryInterface.createTable('LoyaltyChallenges', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      conditions: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      rewardConfig: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      locationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Locations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('LoyaltyChallenges');
  },
};
