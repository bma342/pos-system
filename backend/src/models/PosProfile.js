module.exports = (sequelize, DataTypes) => {
  const PosProfile = sequelize.define('PosProfile', {
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'id',
      },
    },
    posName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loyaltySystem: {
      type: DataTypes.STRING, // Example values: 'BankStyle', 'PointsBased'
      allowNull: false,
    },
    paymentSystem: {
      type: DataTypes.STRING, // Example values: 'Stripe', 'WorldPay'
      allowNull: false,
    },
    integrationSettings: {
      type: DataTypes.JSONB, // Custom JSON field for any additional settings
      allowNull: true,
    },
  });

  PosProfile.associate = (models) => {
    PosProfile.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return PosProfile;
};
