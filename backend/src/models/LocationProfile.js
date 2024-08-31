const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LocationProfile extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LocationProfile.attributes = attributes = {
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Locations', key: 'id' }
  },
  timezone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false
  },
  languagePreference: {
    type: DataTypes.STRING,
    allowNull: true
  },
  deliveryRadius: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  minimumOrderAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  deliveryFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  customSettings: {
    type: DataTypes.JSON,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  LocationProfile.init(LocationProfile.attributes, {
    sequelize,
    modelName: 'LocationProfile',
    tableName: 'locationprofiles', // Adjust this if needed
  });
  return LocationProfile
};