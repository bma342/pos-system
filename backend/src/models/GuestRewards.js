const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class GuestRewards extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

GuestRewards.attributes = attributes = {
  guestId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Guests', key: 'id' }
  },
  rewardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Rewards', key: 'id' }
  },
  issuedDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isRedeemed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  redeemedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'expired', 'redeemed'),
    allowNull: false,
    defaultValue: 'active'
  }
};

module.exports = (sequelize) => {
  GuestRewards.init(GuestRewards.attributes, {
    sequelize,
    modelName: 'GuestRewards',
    tableName: 'guestrewardss', // Adjust this if needed
  });
  return GuestRewards
};