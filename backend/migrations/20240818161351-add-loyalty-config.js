'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const tableExists = await queryInterface.showAllTables().then(tables => tables.includes('LoyaltyConfigs'));
    
    if (!tableExists) {
      await queryInterface.createTable('LoyaltyConfigs', {
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
        pointsPerDollar: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1
        },
        expirationPeriod: {
          type: Sequelize.INTEGER,
          allowNull: true,
          comment: 'Number of days before points expire'
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
      const columns = await queryInterface.describeTable('LoyaltyConfigs');
      
      if (!columns.expirationPeriod) {
        await queryInterface.addColumn('LoyaltyConfigs', 'expirationPeriod', {
          type: Sequelize.INTEGER,
          allowNull: true,
          comment: 'Number of days before points expire'
        });
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('LoyaltyConfigs');
  }
};
