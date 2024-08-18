const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LocationTaxConfig = sequelize.define('LocationTaxConfig', {
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taxRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  taxIdNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = LocationTaxConfig;
