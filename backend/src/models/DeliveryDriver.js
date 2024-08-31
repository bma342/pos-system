const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class DeliveryDriver extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

DeliveryDriver.attributes = attributes = {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  vehicleType: {
    type: DataTypes.ENUM('car', 'motorcycle', 'bicycle', 'scooter'),
    allowNull: false
  },
  licensePlate: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  currentStatus: {
    type: DataTypes.ENUM('available', 'on_delivery', 'offline'),
    allowNull: false,
    defaultValue: 'offline'
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  DeliveryDriver.init(DeliveryDriver.attributes, {
    sequelize,
    modelName: 'DeliveryDriver',
    tableName: 'deliverydrivers', // Adjust this if needed
  });
  return DeliveryDriver
};