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
  await queryInterface.createTable('CateringOrders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      orderNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      guestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Guests',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      houseAccountId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'HouseAccounts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      orderDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      scheduledDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      orderDetails: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'scheduled',
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
    await queryInterface.dropTable('CateringOrders');
  },
};
