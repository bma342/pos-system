const { QueryInterface, DataTypes } = require 'sequelize';

module.exports = {
  up (queryInterface) => {
    await queryInterface.createTable('ClientBrandings', {
      id: {
        allowNull,
        autoIncrement,
        primaryKey,
        type.INTEGER
      },
      clientId: {
        type.INTEGER,
        allowNull,
        references: {
          model: 'Clients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      logo: {
        type.STRING,
        allowNull
      },
      favicon: {
        type.STRING,
        allowNull
      },
      primaryColor: {
        type.STRING,
        allowNull
      },
      secondaryColor: {
        type.STRING,
        allowNull
      },
      accentColor: {
        type.STRING,
        allowNull
      },
      fontFamily: {
        type.STRING,
        allowNull
      },
      buttonStyle: {
        type.ENUM('rounded', 'square'),
        allowNull
      },
      headerStyle: {
        type.ENUM('centered', 'left-aligned'),
        allowNull
      },
      footerContent: {
        type.TEXT,
        allowNull
      },
      createdAt: {
        allowNull,
        type.DATE
      },
      updatedAt: {
        allowNull,
        type.DATE
      }
    });
  },

  down (queryInterface) => {
    await queryInterface.dropTable('ClientBrandings');
  }
};