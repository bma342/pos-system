const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LoyaltyReward extends BaseModel {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      clientId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      pointsRequired: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      reward: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'LoyaltyReward'
    });
  }

  static associate(models) {
    // Define associations if any
  }
}

module.exports = LoyaltyReward;