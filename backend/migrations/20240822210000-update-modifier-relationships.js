'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the MenuItemModifiers table exists
    const tableExists = await queryInterface.describeTable('MenuItemModifiers').catch(() => false);

    if (!tableExists) {
      await queryInterface.createTable('MenuItemModifiers', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
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
        modifierId: {
          type: Sequelize.INTEGER,
          allowNull: false,
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

    // Safeguard: Check if the foreign key constraints already exist before adding them
    const constraints = await queryInterface.getForeignKeyReferencesForTable('MenuItemModifiers');

    if (!constraints.some(c => c.constraintName === 'fk_menuItemModifier_menuItem')) {
      await queryInterface.addConstraint('MenuItemModifiers', {
        fields: ['menuItemId'],
        type: 'foreign key',
        name: 'fk_menuItemModifier_menuItem',
        references: {
          table: 'MenuItems',
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }

    if (!constraints.some(c => c.constraintName === 'fk_menuItemModifier_modifier')) {
      await queryInterface.addConstraint('MenuItemModifiers', {
        fields: ['modifierId'],
        type: 'foreign key',
        name: 'fk_menuItemModifier_modifier',
        references: {
          table: 'Modifiers',
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Safeguard: Only drop the table if it exists
    const tableExists = await queryInterface.describeTable('MenuItemModifiers').catch(() => false);
    if (tableExists) {
      await queryInterface.dropTable('MenuItemModifiers');
    }
  },
};

