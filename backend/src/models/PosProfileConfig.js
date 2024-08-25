const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class PosProfileConfig extends Model {}

PosProfileConfig.init({
  posProfileId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'PosProfiles',
      key: 'id',
    },
  },
  apiEndpoint: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contentType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  format: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'PosProfileConfig',
});

module.exports = PosProfileConfig;
