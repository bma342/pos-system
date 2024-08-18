'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
  const addColumnIfNotExists = async (table, column, type) => {
    const tableExists = await queryInterface.tableExists(table);
    if (tableExists) {
      const columns = await queryInterface.describeTable(table);
      if (!columns[column]) {
        await await addColumnIfNotExists(table, column, type);
      }
    }
  };
  await queryInterface.createTable('Brandings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      primaryColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      secondaryColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tertiaryColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fontColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      secondaryFontColor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fontFamily: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Arial',
      },
      buttonShape: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'rounded',
      },
      logoUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      backgroundUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      faviconUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Brandings');
  },
};
