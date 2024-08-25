module.exports = (sequelize, DataTypes) => {
  const LoyaltySubscription = sequelize.define('LoyaltySubscription', {
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Guests',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    subscriptionType: {
      type: DataTypes.STRING, // 'monthly', 'yearly', 'lifetime'
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true, // Nullable if it's a lifetime subscription
    },
    renewalDate: {
      type: DataTypes.DATE,
      allowNull: true, // For recurring subscriptions
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active', // Can be 'active', 'cancelled', 'paused'
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING, // 'credit card', 'paypal', etc.
      allowNull: false,
    },
    autoRenew: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // If the subscription is set to auto-renew
    },
    paymentDetails: {
      type: DataTypes.JSONB, // Store encrypted payment details or tokenized data
      allowNull: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  });

  LoyaltySubscription.associate = (models) => {
    LoyaltySubscription.belongsTo(models.Guest, { foreignKey: 'guestId' });
    LoyaltySubscription.belongsTo(models.Client, { foreignKey: 'clientId' });
  };

  return LoyaltySubscription;
};
