// src/models/Wallet.js
module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'USD', // Default currency, but can be adjusted
      allowNull: false,
    },
    guestId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Guests',
        key: 'id',
      },
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id',
      },
      allowNull: false,
    },
  });

  Wallet.associate = (models) => {
    Wallet.belongsTo(models.Guest, { foreignKey: 'guestId', onDelete: 'CASCADE' });
    Wallet.belongsTo(models.Client, { foreignKey: 'clientId', onDelete: 'CASCADE' }); // Enforce client isolation
    Wallet.hasMany(models.Discount, { foreignKey: 'walletId', onDelete: 'CASCADE' });
    Wallet.hasMany(models.LoyaltyReward, { foreignKey: 'walletId', onDelete: 'CASCADE' });
  };

  // Business logic for updating Wallet balance
  Wallet.prototype.updateBalance = async function () {
    const rewards = await this.getLoyaltyRewards();
    const discounts = await this.getDiscounts();

    // Calculate the effective balance, including rewards and discounts
    this.balance = rewards.reduce((total, reward) => total + reward.value, 0) - discounts.reduce((total, discount) => total + discount.value, 0);

    await this.save();
  };

  return Wallet;
};
