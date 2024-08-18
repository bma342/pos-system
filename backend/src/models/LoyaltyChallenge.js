module.exports = (sequelize, DataTypes) => {
  const LoyaltyChallenge = sequelize.define('LoyaltyChallenge', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    conditions: {
      type: DataTypes.JSONB, // e.g., { itemCount: 10, timeframe: '1 month' }
      allowNull: false,
    },
    rewardConfig: {
      type: DataTypes.JSONB, // e.g., { reward: "Free Smoothie", points: 100 }
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
    },
  });

  LoyaltyChallenge.associate = (models) => {
    LoyaltyChallenge.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return LoyaltyChallenge;
};
