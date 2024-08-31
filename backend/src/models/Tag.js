const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Tag extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Tag.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('dietary', 'allergen', 'cuisine', 'custom'),
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  Tag.init(Tag.attributes, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags', // Adjust this if needed
  });
  return Tag
};