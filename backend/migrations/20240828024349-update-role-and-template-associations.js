'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Helper function to check if a table exists
      const tableExists = async (tableName) => {
        try {
          await queryInterface.describeTable(tableName);
          return true;
        } catch (error) {
          return false;
        }
      };

      // Helper function to add a column if it doesn't exist
      const addColumnIfNotExists = async (tableName, columnName, columnDefinition) => {
        const table = await queryInterface.describeTable(tableName);
        if (!table[columnName]) {
          await queryInterface.addColumn(tableName, columnName, columnDefinition, { transaction });
        }
      };

      // Create or update RoleTemplates table
      if (!(await tableExists('RoleTemplates'))) {
        await queryInterface.createTable('RoleTemplates', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          description: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          isEditable: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
          },
          isPredefined: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          }
        }, { transaction });
      } else {
        // Add columns if they don't exist
        await addColumnIfNotExists('RoleTemplates', 'isEditable', {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        });
        await addColumnIfNotExists('RoleTemplates', 'isPredefined', {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        });
      }

      // Create or update Roles table
      if (!(await tableExists('Roles'))) {
        await queryInterface.createTable('Roles', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          level: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
          },
          description: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          isPredefined: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          isEditable: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
          },
          isAssignable: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
          },
          clientId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Clients',
              key: 'id',
            },
            onDelete: 'CASCADE',
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          }
        }, { transaction });
      } else {
        // Add columns if they don't exist
        await addColumnIfNotExists('Roles', 'level', {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
        });
        await addColumnIfNotExists('Roles', 'isPredefined', {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        });
        await addColumnIfNotExists('Roles', 'isEditable', {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        });
        await addColumnIfNotExists('Roles', 'isAssignable', {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        });
      }

      // Create RoleTemplateAssignments table if it doesn't exist
      if (!(await tableExists('RoleTemplateAssignments'))) {
        await queryInterface.createTable('RoleTemplateAssignments', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          roleId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Roles',
              key: 'id',
            },
            onDelete: 'CASCADE',
            allowNull: false,
          },
          roleTemplateId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'RoleTemplates',
              key: 'id',
            },
            onDelete: 'CASCADE',
            allowNull: false,
          },
          clientId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Clients',
              key: 'id',
            },
            onDelete: 'CASCADE',
            allowNull: false,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          }
        }, { transaction });

        // Add index only if the table was just created
        await queryInterface.addIndex('RoleTemplateAssignments', ['roleId', 'roleTemplateId', 'clientId'], {
          unique: true,
          name: 'unique_role_template_assignment',
          transaction
        });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Remove index if it exists
      await queryInterface.removeIndex('RoleTemplateAssignments', 'unique_role_template_assignment', { transaction }).catch(() => {});

      // Drop tables if they exist
      await queryInterface.dropTable('RoleTemplateAssignments', { transaction }).catch(() => {});
      
      // Remove added columns from Roles if they exist
      await queryInterface.removeColumn('Roles', 'level', { transaction }).catch(() => {});
      await queryInterface.removeColumn('Roles', 'isPredefined', { transaction }).catch(() => {});
      await queryInterface.removeColumn('Roles', 'isEditable', { transaction }).catch(() => {});
      await queryInterface.removeColumn('Roles', 'isAssignable', { transaction }).catch(() => {});

      // Remove added columns from RoleTemplates if they exist
      await queryInterface.removeColumn('RoleTemplates', 'isEditable', { transaction }).catch(() => {});
      await queryInterface.removeColumn('RoleTemplates', 'isPredefined', { transaction }).catch(() => {});

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
