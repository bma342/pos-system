'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const tableExists = await queryInterface.showAllTables().then(tables => tables.includes('LocationTaxConfigs'));
    
    if (!tableExists) {
      await queryInterface.createTable('LocationTaxConfigs', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        locationId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Locations',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        taxRate: {
          type: Sequelize.DECIMAL(5, 2),
          allowNull: false
        },
        taxType: {
          type: Sequelize.ENUM('Sales', 'VAT', 'GST'),
          allowNull: false
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
      const columns = await queryInterface.describeTable('LocationTaxConfigs');
      
      if (!columns.taxRate) {
        await queryInterface.addColumn('LocationTaxConfigs', 'taxRate', {
          type: Sequelize.DECIMAL(5, 2),
          allowNull: false
        });
      }
      
      if (!columns.taxType) {
        await queryInterface.addColumn('LocationTaxConfigs', 'taxType', {
          type: Sequelize.ENUM('Sales', 'VAT', 'GST'),
          allowNull: false
        });
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('LocationTaxConfigs');
  }
};
