module.exports = (sequelize, DataTypes) => {
  const Refund = sequelize.define('Refund', {
    transactionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Transactions',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    refundId: {
      type: DataTypes.STRING,
      allowNull: false, // Unique ID provided by the payment provider for the refund
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
    providerResponse: {
      type: DataTypes.JSONB, // Store the raw response from the payment provider
      allowNull: true,
    },
    errorCode: {
      type: DataTypes.STRING, // Optional field to store error codes
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

  Refund.associate = (models) => {
    Refund.belongsTo(models.Transaction, { foreignKey: 'transactionId' });
  };

  return Refund;
};
