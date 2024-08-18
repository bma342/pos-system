const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tax = sequelize.define('Tax', {
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taxRate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  exemptedUsers: {
    type: DataTypes.JSON, // Array of user IDs who are tax-exempt
    defaultValue: [],
  },
  taxIdNumber: {
    type: DataTypes.STRING,
    allowNull: true, // Only applicable for exempted users
  },
});

module.exports = Tax;
