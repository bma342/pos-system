'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the 'MenuItems' table exists before creating it
    const tableExists = await queryInterface.sequelize.queryInterface.tableExists('MenuItems');
    if (!tableExists) {
      await queryInterface.createTable('MenuItems', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        basePrice: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        pointsPrice: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        posItemId: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        imageUrl: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
    }

    // Check if the 'Modifiers' table exists before creating it
    const modifierTableExists = await queryInterface.sequelize.queryInterface.tableExists('Modifiers');
    if (!modifierTableExists) {
      await queryInterface.createTable('Modifiers', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        posModifierId: {
          type: Sequelize.STRING,
          allowNull: true, // For storing specific POS integration IDs
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
    }

    // Check if the 'MenuItemModifiers' table exists before creating it
    const itemModifierTableExists = await queryInterface.sequelize.queryInterface.tableExists('MenuItemModifiers');
    if (!itemModifierTableExists) {
      await queryInterface.createTable('MenuItemModifiers', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        menuItemId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'MenuItems',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        modifierId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Modifiers',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        isDefault: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        removable: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
    }

    // If columns need to be altered, this is where you’d handle those adjustments.
    const tableColumns = await queryInterface.describeTable('MenuItems');
    if (!tableColumns.hasOwnProperty('posItemId')) {
      await queryInterface.addColumn('MenuItems', 'posItemId', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    // Repeat similar checks and updates for other columns if needed
  },

  down: async (queryInterface, Sequelize) => {
    // Only drop tables if they exist
    const itemModifierTableExists = await queryInterface.sequelize.queryInterface.tableExists('MenuItemModifiers');
    if (itemModifierTableExists) {
      await queryInterface.dropTable('MenuItemModifiers');
    }

    const modifierTableExists = await queryInterface.sequelize.queryInterface.tableExists('Modifiers');
    if (modifierTableExists) {
      await queryInterface.dropTable('Modifiers');
    }

    const tableExists = await queryInterface.sequelize.queryInterface.tableExists('MenuItems');
    if (tableExists) {
      await queryInterface.dropTable('MenuItems');
    }
  },
};
