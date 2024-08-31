const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Asset extends BaseModel {
  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'clientId' });
  }
}

Asset.attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  Asset.init(Asset.attributes, {
    sequelize,
    modelName: 'Asset',
    tableName: 'assets', // Adjust this if needed
  });
  return Asset
};