const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class ItemReview extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

ItemReview.attributes = attributes = {
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Items', key: 'id' }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
};

module.exports = (sequelize) => {
  ItemReview.init(ItemReview.attributes, {
    sequelize,
    modelName: 'ItemReview',
    tableName: 'itemreviews', // Adjust this if needed
  });
  return ItemReview
};