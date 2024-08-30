'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const tableExists = await queryInterface.showAllTables().then(tables => tables.includes('LoyaltyIntegrations'));
    
    if (!tableExists) {
      await queryInterface.createTable('LoyaltyIntegrations', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        clientId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Clients',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        integrationType: {
          type: Sequelize.ENUM('POS', 'CRM', 'Custom'),
          allowNull: false
        },
        integrationDetails: {
          type: Sequelize.JSON,
          allowNull: false
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    } else {
      const columns = await queryInterface.describeTable('LoyaltyIntegrations');
      
      if (!columns.isActive) {
        await queryInterface.addColumn('LoyaltyIntegrations', 'isActive', {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        });
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('LoyaltyIntegrations');
  }
};
