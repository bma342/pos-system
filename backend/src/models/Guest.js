const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Guest extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Guest.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  lastOrderDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  totalOrders: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  totalSpent: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  }
};

module.exports = (sequelize) => {
  Guest.init(Guest.attributes, {
    sequelize,
    modelName: 'Guest',
    tableName: 'guests', // Adjust this if needed
  });
  return Guest
};