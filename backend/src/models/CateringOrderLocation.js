const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CateringOrderLocation extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

CateringOrderLocation.attributes = attributes = {
  cateringOrderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'CateringOrders', key: 'id' }
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Locations', key: 'id' }
  },
  isPickup: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  deliveryAddress: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  deliveryInstructions: {
    type: DataTypes.TEXT,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  CateringOrderLocation.init(CateringOrderLocation.attributes, {
    sequelize,
    modelName: 'CateringOrderLocation',
    tableName: 'cateringorderlocations', // Adjust this if needed
  });
  return CateringOrderLocation
};