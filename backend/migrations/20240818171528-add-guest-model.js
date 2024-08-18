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
  await queryInterface.createTable('Guests', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
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
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      googleId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      appleId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      metaId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      favoriteMenuItem: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      favoriteOrderType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastLocationVisited: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mostFrequentedLocation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numberOfUniqueLocationsVisited: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      numberOfOrders: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      averageOrderSize: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      lastOrderDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      marketingPreferences: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      locationPreferences: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      loyaltyPoints: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      loyaltyTier: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      loyaltySubscription: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      dietaryPreferences: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      orderFrequency: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      totalSpend: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      averageVisitTime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      preferredPaymentMethod: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      visitHistory: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      referralSource: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Guests');
  },
};
