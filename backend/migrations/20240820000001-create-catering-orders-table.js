'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableExists = await queryInterface.describeTable('CateringOrders').catch(() => false);

    if (!tableExists) {
      await queryInterface.createTable('CateringOrders', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
          allowNull: false,
          defaultValue: 'scheduled',
        },
        deliveryMethod: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        driverTip: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        kitchenTip: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        cateringFees: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        commissaryKitchenId: {
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
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableExists = await queryInterface.describeTable('CateringOrders').catch(() => false);
    if (tableExists) {
      await queryInterface.dropTable('CateringOrders');
    }
  },
};
