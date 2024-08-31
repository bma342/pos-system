const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CommissaryLocation extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

CommissaryLocation.attributes = attributes = {
  commissaryKitchenId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'CommissaryKitchens', key: 'id' }
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Locations', key: 'id' }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  deliverySchedule: {
    type: DataTypes.JSON,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  CommissaryLocation.init(CommissaryLocation.attributes, {
    sequelize,
    modelName: 'CommissaryLocation',
    tableName: 'commissarylocations', // Adjust this if needed
  });
  return CommissaryLocation
};