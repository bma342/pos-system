const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class GuestLoyaltyProgram extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

GuestLoyaltyProgram.attributes = attributes = {
  guestId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Guests', key: 'id' }
  },
  loyaltyProgramId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'LoyaltyPrograms', key: 'id' }
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  tier: {
    type: DataTypes.STRING,
    allowNull: true
  },
  joinDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  lastActivityDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  GuestLoyaltyProgram.init(GuestLoyaltyProgram.attributes, {
    sequelize,
    modelName: 'GuestLoyaltyProgram',
    tableName: 'guestloyaltyprograms', // Adjust this if needed
  });
  return GuestLoyaltyProgram
};