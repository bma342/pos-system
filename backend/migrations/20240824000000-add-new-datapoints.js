'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableExists = async (tableName) => {
      try {
        await queryInterface.describeTable(tableName);
        return true;
      } catch (err) {
        return false;
      }
    };

    // Catering Orders - Add Service Fees, Tips, and Tax Details
    if (await tableExists('CateringOrders')) {
      const columns = await queryInterface.describeTable('CateringOrders');

      if (!columns.serviceFee) {
        await queryInterface.addColumn('CateringOrders', 'serviceFee', {
          type: Sequelize.FLOAT,
          allowNull: true,
        });
      }

      if (!columns.packagingFee) {
        await queryInterface.addColumn('CateringOrders', 'packagingFee', {
          type: Sequelize.FLOAT,
          allowNull: true,
        });
      }

      if (!columns.deliveryFee) {
        await queryInterface.addColumn('CateringOrders', 'deliveryFee', {
          type: Sequelize.FLOAT,
          allowNull: true,
        });
      }

      if (!columns.kitchenTip) {
        await queryInterface.addColumn('CateringOrders', 'kitchenTip', {
          type: Sequelize.FLOAT,
          allowNull: true,
        });
      }

      if (!columns.driverTip) {
        await queryInterface.addColumn('CateringOrders', 'driverTip', {
          type: Sequelize.FLOAT,
          allowNull: true,
        });
      }

      if (!columns.taxExempt) {
        await queryInterface.addColumn('CateringOrders', 'taxExempt', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        });
      }

      if (!columns.taxIdNumber) {
        await queryInterface.addColumn('CateringOrders', 'taxIdNumber', {
          type: Sequelize.STRING,
          allowNull: true,
        });
      }
    }

    // POS Profiles - Add New Columns
    if (await tableExists('PosProfiles')) {
      const columns = await queryInterface.describeTable('PosProfiles');

      if (!columns.apiBaseUrl) {
        await queryInterface.addColumn('PosProfiles', 'apiBaseUrl', {
          type: Sequelize.STRING,
          allowNull: true,
        });
      }

      if (!columns.clientSecret) {
        await queryInterface.addColumn('PosProfiles', 'clientSecret', {
          type: Sequelize.STRING,
          allowNull: true,
        });
      }

      if (!columns.contentType) {
        await queryInterface.addColumn('PosProfiles', 'contentType', {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'application/json',
        });
      }

      if (!columns.syncFrequency) {
        await queryInterface.addColumn('PosProfiles', 'syncFrequency', {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 24, // Default sync frequency in hours
        });
      }

      if (!columns.roundingOption) {
        await queryInterface.addColumn('PosProfiles', 'roundingOption', {
          type: Sequelize.STRING,
          allowNull: true,
        });
      }

      if (!columns.testProfile) {
        await queryInterface.addColumn('PosProfiles', 'testProfile', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        });
      }
    }

    // Analytics - Add New Columns
    if (await tableExists('Analytics')) {
      const columns = await queryInterface.describeTable('Analytics');

      if (!columns.metricType) {
        await queryInterface.addColumn('Analytics', 'metricType', {
          type: Sequelize.STRING,
          allowNull: false,
        });
      }

      if (!columns.testGroup) {
        await queryInterface.addColumn('Analytics', 'testGroup', {
          type: Sequelize.STRING,
          allowNull: true,
        });
      }

      if (!columns.conversionRate) {
        await queryInterface.addColumn('Analytics', 'conversionRate', {
          type: Sequelize.FLOAT,
          allowNull: true,
        });
      }
    }

    // Brandings - Add New Branding Options
    if (await tableExists('Brandings')) {
      const columns = await queryInterface.describeTable('Brandings');

      if (!columns.primaryColor) {
        await queryInterface.addColumn('Brandings', 'primaryColor', {
          type: Sequelize.STRING,
          allowNull: true,
        });
      }

      if (!columns.secondaryColor) {
        await queryInterface.addColumn('Brandings', 'secondaryColor', {
          type: Sequelize.STRING,
          allowNull: true,
        });
      }

      if (!columns.logoUrl) {
        await queryInterface.addColumn('Brandings', 'logoUrl', {
          type: Sequelize.STRING,
          allowNull: true,
        });
      }

      if (!columns.backgroundUrl) {
        await queryInterface.addColumn('Brandings', 'backgroundUrl', {
          type: Sequelize.STRING,
          allowNull: true,
        });
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    // No need to remove any columns or tables in the down migration.
  },
};
