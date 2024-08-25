const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const LoyaltyReward = sequelize.define('LoyaltyReward', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tier: {
      type: DataTypes.STRING, // Tier name, like 'Gold', 'Platinum'
      allowNull: false,
    },
    pointsRequired: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expirationDays: {
      type: DataTypes.INTEGER, // Rolling expiration in days after earning
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
    walletId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Wallets',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    },
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    },
    vanityName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 50],
      },
    },
    vanityDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 100],
      },
    },
    posPayload: {
      type: DataTypes.JSONB, // Store original POS reward payload for syncing and pass-through
      allowNull: true,
    },
    redemptionMethod: {
      type: DataTypes.ENUM('auto', 'manual', 'on-site'),
      allowNull: false,
      defaultValue: 'manual', // Specifies how the reward is redeemed
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('now'),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('now'),
    },
  });

  LoyaltyReward.associate = (models) => {
    LoyaltyReward.belongsTo(models.Wallet, { foreignKey: 'walletId' });
    LoyaltyReward.belongsTo(models.Location, { foreignKey: 'locationId' });
    LoyaltyReward.belongsTo(models.LoyaltyProgram, { foreignKey: 'loyaltyProgramId' });
  };

  return LoyaltyReward;
};
