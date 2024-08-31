const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class TrackingPixel extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

TrackingPixel.attributes = {
  // Define attributes here
};

module.exports = (sequelize) => {
  TrackingPixel.init(TrackingPixel.attributes, {
    sequelize,
    modelName: 'TrackingPixel',
    tableName: 'trackingpixels', // Adjust this if needed
  });
  return TrackingPixel
};