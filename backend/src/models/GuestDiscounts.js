const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class GuestDiscounts extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

GuestDiscounts.attributes = attributes = {
  guestId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Guests', key: 'id' }
  },
  discountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Discounts', key: 'id' }
  },
  usageCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  lastUsedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  GuestDiscounts.init(GuestDiscounts.attributes, {
    sequelize,
    modelName: 'GuestDiscounts',
    tableName: 'guestdiscountss', // Adjust this if needed
  });
  return GuestDiscounts
};