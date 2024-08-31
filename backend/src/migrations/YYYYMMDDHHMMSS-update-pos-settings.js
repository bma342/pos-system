const { QueryInterface, DataTypes } = require 'sequelize';

module.exports = {
  up (queryInterface) => {
    await queryInterface.addColumn('POSSettings', 'clientId', {
      type.INTEGER,
      allowNull,
      references: {
        model: 'Clients',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down (queryInterface) => {
    await queryInterface.removeColumn('POSSettings', 'clientId');
  }
};