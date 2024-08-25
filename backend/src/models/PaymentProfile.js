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
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USD',
    },
    transactionFeePercentage: {
      type: DataTypes.FLOAT,
      allowNull: true, // Optional field to store the provider’s transaction fee
      defaultValue: 0.0,
    },
    additionalConfig: {
      type: DataTypes.JSONB, // Allows storing provider-specific additional configurations
      allowNull: true,
    },
    webhookUrl: {
      type: DataTypes.STRING, // Optional: URL to receive payment status updates
      allowNull: true,
    },
    providerAccountId: {
      type: DataTypes.STRING,
      allowNull: true, // Optional: Provider-specific account ID
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active', // Can be 'active', 'disabled', etc.
    },
  });

  PaymentProfile.associate = (models) => {
    PaymentProfile.belongsTo(models.Location, { foreignKey: 'locationId' });
    PaymentProfile.hasMany(models.Transaction, { foreignKey: 'paymentProfileId' }); // Association with transactions
  };

  return PaymentProfile;
};
