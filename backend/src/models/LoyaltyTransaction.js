module.exports = (sequelize, DataTypes) => {
  const LoyaltyTransaction = sequelize.define('LoyaltyTransaction', {
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING, // 'earn' or 'redeem'
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  LoyaltyTransaction.associate = (models) => {
    LoyaltyTransaction.belongsTo(models.Guest, { foreignKey: 'guestId' });
  };

  return LoyaltyTransaction;
};
