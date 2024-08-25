'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Helper function to check if a column already exists in a table
    const columnExists = async (tableName, columnName) => {
      const tableDescription = await queryInterface.describeTable(tableName);
      return tableDescription.hasOwnProperty(columnName);
    };

    // Catering Orders relationships
    if (await columnExists('CateringOrders', 'guestId')) {
      // Ensure foreign key constraint for guestId
      const constraints = await queryInterface.getForeignKeyReferencesForTable('CateringOrders');
      if (!constraints.some(c => c.constraintName === 'fk_catering_orders_guest')) {
        await queryInterface.addConstraint('CateringOrders', {
          fields: ['guestId'],
          type: 'foreign key',
          name: 'fk_catering_orders_guest',
          references: {
            table: 'Guests',
            field: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      }
    }

    if (await columnExists('CateringOrders', 'houseAccountId')) {
      // Ensure foreign key constraint for houseAccountId
      const constraints = await queryInterface.getForeignKeyReferencesForTable('CateringOrders');
      if (!constraints.some(c => c.constraintName === 'fk_catering_orders_house_account')) {
        await queryInterface.addConstraint('CateringOrders', {
          fields: ['houseAccountId'],
          type: 'foreign key',
          name: 'fk_catering_orders_house_account',
          references: {
            table: 'HouseAccounts',
            field: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      }
    }

    if (await columnExists('CateringOrders', 'locationId')) {
      // Ensure foreign key constraint for locationId
      const constraints = await queryInterface.getForeignKeyReferencesForTable('CateringOrders');
      if (!constraints.some(c => c.constraintName === 'fk_catering_orders_location')) {
        await queryInterface.addConstraint('CateringOrders', {
          fields: ['locationId'],
          type: 'foreign key',
          name: 'fk_catering_orders_location',
          references: {
            table: 'Locations',
            field: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      }
    }

    // POS Profiles relationships
    if (await columnExists('PosProfiles', 'locationId')) {
      const constraints = await queryInterface.getForeignKeyReferencesForTable('PosProfiles');
      if (!constraints.some(c => c.constraintName === 'fk_pos_profiles_location')) {
        await queryInterface.addConstraint('PosProfiles', {
          fields: ['locationId'],
          type: 'foreign key',
          name: 'fk_pos_profiles_location',
          references: {
            table: 'Locations',
            field: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      }
    }

    // Analytics relationships
    if (await columnExists('Analytics', 'clientId')) {
      const constraints = await queryInterface.getForeignKeyReferencesForTable('Analytics');
      if (!constraints.some(c => c.constraintName === 'fk_analytics_client')) {
        await queryInterface.addConstraint('Analytics', {
          fields: ['clientId'],
          type: 'foreign key',
          name: 'fk_analytics_client',
          references: {
            table: 'Clients',
            field: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      }
    }

    if (await columnExists('Analytics', 'reportId')) {
      const constraints = await queryInterface.getForeignKeyReferencesForTable('Analytics');
      if (!constraints.some(c => c.constraintName === 'fk_analytics_report')) {
        await queryInterface.addConstraint('Analytics', {
          fields: ['reportId'],
          type: 'foreign key',
          name: 'fk_analytics_report',
          references: {
            table: 'MarketingReports',
            field: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      }
    }

    if (await columnExists('Analytics', 'menuItemId')) {
      const constraints = await queryInterface.getForeignKeyReferencesForTable('Analytics');
      if (!constraints.some(c => c.constraintName === 'fk_analytics_menu_item')) {
        await queryInterface.addConstraint('Analytics', {
          fields: ['menuItemId'],
          type: 'foreign key',
          name: 'fk_analytics_menu_item',
          references: {
            table: 'MenuItems',
            field: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      }
    }

    if (await columnExists('Analytics', 'modifierId')) {
      const constraints = await queryInterface.getForeignKeyReferencesForTable('Analytics');
      if (!constraints.some(c => c.constraintName === 'fk_analytics_modifier')) {
        await queryInterface.addConstraint('Analytics', {
          fields: ['modifierId'],
          type: 'foreign key',
          name: 'fk_analytics_modifier',
          references: {
            table: 'Modifiers',
            field: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      }
    }

    // Brandings relationships
    if (await columnExists('Brandings', 'clientId')) {
      const constraints = await queryInterface.getForeignKeyReferencesForTable('Brandings');
      if (!constraints.some(c => c.constraintName === 'fk_brandings_client')) {
        await queryInterface.addConstraint('Brandings', {
          fields: ['clientId'],
          type: 'foreign key',
          name: 'fk_brandings_client',
          references: {
            table: 'Clients',
            field: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    // No need to remove any relationships in the down migration.
  },
};
