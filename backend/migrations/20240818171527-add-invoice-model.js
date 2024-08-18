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
  await queryInterface.createTable('Invoices', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      invoiceNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'paid', 'overdue'),
        allowNull: false,
        defaultValue: 'pending',
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      generatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      houseAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'HouseAccounts',
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
    await queryInterface.dropTable('Invoices');
  },
};
