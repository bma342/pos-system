// ~/pos-system/backend/src/models/Guest.js
'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Guest = sequelize.define('Guest', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex', // Unique in combination with clientId
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, // Optional for social logins
      set(value) {
        if (value) {
          const salt = bcrypt.genSaltSync(10);
          this.setDataValue('password', bcrypt.hashSync(value, salt));
        }
      },
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    appleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    metaId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    favoriteMenuItem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    favoriteOrderType: {
      type: DataTypes.STRING, // Example: 'in-store', 'online', 'delivery', 'pickup'
      allowNull: true,
    },
    lastLocationVisited: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mostFrequentedLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numberOfUniqueLocationsVisited: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    numberOfOrders: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    averageOrderSize: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    lastOrderDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    marketingPreferences: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    locationPreferences: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    loyaltyPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    loyaltyTier: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    loyaltySubscription: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    dietaryPreferences: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    orderFrequency: {
      type: DataTypes.INTEGER, // Average days between orders
      allowNull: true,
    },
    totalSpend: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    engagementScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Guest.associate = (models) => {
    Guest.belongsTo(models.Client, { foreignKey: 'clientId', allowNull: false }); // Enforce tenant isolation
    Guest.hasMany(models.Order, { foreignKey: 'guestId' });
    Guest.hasOne(models.Wallet, { foreignKey: 'guestId' });
    Guest.hasMany(models.ItemReview, { foreignKey: 'guestId' }); // Associate with reviews
  };

  // Instance method to check if the entered password matches the stored hash
  Guest.prototype.validPassword = async function (password) {
    if (!this.password) return false; // If password is not set (e.g., social login), return false
    return await bcrypt.compare(password, this.password);
  };

  // Business logic for updating calculated fields
  Guest.prototype.updateCalculatedFields = async function () {
    const orders = await this.getOrders();

    // Calculate average order size
    if (orders.length) {
      this.averageOrderSize = orders.reduce((total, order) => total + order.totalAmount, 0) / orders.length;
    }

    // Calculate days between orders (order frequency)
    if (orders.length > 1) {
      const daysBetweenOrders = orders
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((order, index, arr) => index > 0 ? (new Date(order.createdAt) - new Date(arr[index - 1].createdAt)) / (1000 * 60 * 60 * 24) : 0)
        .filter(day => day > 0);

      if (daysBetweenOrders.length > 0) {
        this.orderFrequency = Math.round(daysBetweenOrders.reduce((a, b) => a + b, 0) / daysBetweenOrders.length);
      }
    }

    // Calculate total spend
    this.totalSpend = orders.reduce((total, order) => total + order.totalAmount, 0);

    // Calculate engagement score (based on total spend, order frequency, etc.)
    this.engagementScore = Math.round((this.totalSpend / this.numberOfOrders) * (100 / (this.orderFrequency || 1)));

    await this.save();
  };

  return Guest;
};
