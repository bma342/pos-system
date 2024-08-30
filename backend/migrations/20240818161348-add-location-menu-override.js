'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Check if the table already exists
    const tableExists = await queryInterface.showAllTables().then(tables => tables.includes('LocationMenuOverrides'));
    
    if (!tableExists) {
      await queryInterface.createTable('LocationMenuOverrides', {
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
        menuItemId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'MenuItems',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: true
        },
        isAvailable: {
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
      // If table exists, check for and add missing columns
      const columns = await queryInterface.describeTable('LocationMenuOverrides');
      
      if (!columns.price) {
        await queryInterface.addColumn('LocationMenuOverrides', 'price', {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: true
        });
      }
      
      if (!columns.isAvailable) {
        await queryInterface.addColumn('LocationMenuOverrides', 'isAvailable', {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        });
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('LocationMenuOverrides');
  }
};
