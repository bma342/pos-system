const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class TrackingPixel extends Model {}

TrackingPixel.init({
  locationId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Locations',
      key: 'id',
    },
  },
  type: {
    type: DataTypes.ENUM('TikTok', 'GTM', 'Meta', 'Other'),
    allowNull: false,
  },
  pixelId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isGlobal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'TrackingPixel',
});

module.exports = TrackingPixel;
