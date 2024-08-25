module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    paymentProfileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PaymentProfiles',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false, // Store the unique ID provided by the payment provider
      unique: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USD',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending', // Possible values: 'pending', 'completed', 'failed'
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true, // e.g., 'credit_card', 'paypal', 'stripe', etc.
    },
    providerResponse: {
      type: DataTypes.JSONB, // Store the raw response from the payment provider for audit purposes
      allowNull: true,
    },
    errorCode: {
      type: DataTypes.STRING, // Optional field to store error codes returned by the provider
      allowNull: true,
    },
    errorMessage: {
      type: DataTypes.STRING, // Optional field to store error messages
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.PaymentProfile, { foreignKey: 'paymentProfileId' });
    Transaction.belongsTo(models.Order, { foreignKey: 'orderId' });

    // Optionally, associate with refund records if applicable
    Transaction.hasMany(models.Refund, { foreignKey: 'transactionId' });
  };

  return Transaction;
};
