const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LocationTaxConfig extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LocationTaxConfig.attributes = attributes = {
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Locations', key: 'id' }
  },
  taxName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  taxRate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  applicableItemCategories: {
    type: DataTypes.JSON,
    allowNull: true
  },
  exemptItemCategories: {
    type: DataTypes.JSON,
    allowNull: true
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  LocationTaxConfig.init(LocationTaxConfig.attributes, {
    sequelize,
    modelName: 'LocationTaxConfig',
    tableName: 'locationtaxconfigs', // Adjust this if needed
  });
  return LocationTaxConfig
};