module.exports = (sequelize, DataTypes) => {
  const PaymentProfile = sequelize.define('PaymentProfile', {
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'id',
      },
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secretKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sandboxMode: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  PaymentProfile.associate = (models) => {
    PaymentProfile.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return PaymentProfile;
};
