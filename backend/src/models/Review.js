const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Review extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Review.attributes = attributes = {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Orders', key: 'id' }
  },
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'MenuItems', key: 'id' }
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
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    allowNull: false,
    defaultValue: 'pending'
  }
};

module.exports = (sequelize) => {
  Review.init(Review.attributes, {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews', // Adjust this if needed
  });
  return Review
};