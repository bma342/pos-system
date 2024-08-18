'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProviderPricings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      providerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ProviderIntegrations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      menuItemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MenuItems',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      upliftPercentage: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
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
    await queryInterface.dropTable('ProviderPricings');
  },
};
