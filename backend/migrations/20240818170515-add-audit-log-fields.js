'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Describe the 'AuditLogs' table to check existing columns
    const tableInfo = await queryInterface.describeTable('AuditLogs');

    // Add columns if they do not exist
    if (!tableInfo.action) {
      await queryInterface.addColumn('AuditLogs', 'action', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    }

    if (!tableInfo.timestamp) {
      await queryInterface.addColumn('AuditLogs', 'timestamp', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      });
    }

    if (!tableInfo.details) {
      await queryInterface.addColumn('AuditLogs', 'details', {
        type: Sequelize.JSONB,
        allowNull: true,
      });
    }

    if (!tableInfo.userId) {
      await queryInterface.addColumn('AuditLogs', 'userId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove columns from 'AuditLogs' table
    if (tableInfo.action) {
      await queryInterface.removeColumn('AuditLogs', 'action');
    }

    if (tableInfo.timestamp) {
      await queryInterface.removeColumn('AuditLogs', 'timestamp');
    }

    if (tableInfo.details) {
      await queryInterface.removeColumn('AuditLogs', 'details');
    }

    if (tableInfo.userId) {
      await queryInterface.removeColumn('AuditLogs', 'userId');
    }
  },
};
