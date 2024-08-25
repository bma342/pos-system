module.exports = (sequelize, DataTypes) => {
  const LoyaltyProgram = sequelize.define('LoyaltyProgram', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pointsPerDollar: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1.0,
    },
    tierName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tierThreshold: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bonusPointsMultiplier: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 1.0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    expirationPolicy: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id',
      },
    },
  });

  LoyaltyProgram.associate = (models) => {
    LoyaltyProgram.belongsTo(models.Client, { foreignKey: 'clientId' });
    LoyaltyProgram.hasMany(models.LoyaltyChallenge, { foreignKey: 'loyaltyProgramId' });
    LoyaltyProgram.hasMany(models.LoyaltyReward, { foreignKey: 'loyaltyProgramId' });
    LoyaltyProgram.hasMany(models.LoyaltyTransaction, { foreignKey: 'loyaltyProgramId' });
  };

  return LoyaltyProgram;
};
