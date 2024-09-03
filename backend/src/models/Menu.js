const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Menu = sequelize.define('Menu', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  locationId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  menuType: {
    type: DataTypes.ENUM('REGULAR', 'SPECIAL', 'SEASONAL'),
    defaultValue: 'REGULAR',
  },
});

Menu.associate = (models) => {
  Menu.hasMany(models.MenuGroup, { as: 'groups', foreignKey: 'menuId' });
  Menu.belongsTo(models.Client, { foreignKey: 'clientId' });
  Menu.belongsTo(models.Location, { foreignKey: 'locationId' });
};

module.exports = Menu;