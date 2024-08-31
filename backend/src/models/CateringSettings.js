const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CateringSettings extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

CateringSettings.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  minimumOrderAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  leadTimeHours: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 24
  },
  maxOrderDaysInAdvance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 30
  },
  deliveryFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  serviceFeePercentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  allowPickup: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  allowDelivery: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  CateringSettings.init(CateringSettings.attributes, {
    sequelize,
    modelName: 'CateringSettings',
    tableName: 'cateringsettingss', // Adjust this if needed
  });
  return CateringSettings
};