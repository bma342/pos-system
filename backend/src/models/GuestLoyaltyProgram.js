module.exports = (sequelize, DataTypes) => {
  const GuestLoyaltyProgram = sequelize.define('GuestLoyaltyProgram', {
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Guests',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    loyaltyProgramId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'LoyaltyPrograms',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    pointsEarned: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    tierStatus: {
      type: DataTypes.STRING,
      allowNull: true, // Optional status (e.g., 'Gold', 'Silver', etc.)
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastUpdated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  GuestLoyaltyProgram.associate = (models) => {
    GuestLoyaltyProgram.belongsTo(models.Guest, { foreignKey: 'guestId' });
    GuestLoyaltyProgram.belongsTo(models.LoyaltyProgram, { foreignKey: 'loyaltyProgramId' });
  };

  return GuestLoyaltyProgram;
};
