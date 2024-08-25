module.exports = (sequelize, DataTypes) => {
  const GuestProfile = sequelize.define('GuestProfile', {
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
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    favoriteMenuItem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numberOfOrders: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    avgOrderSize: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    loyaltyPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    loyaltyTier: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preferredOrderType: {
      type: DataTypes.STRING, // e.g., 'dine-in', 'pickup', 'delivery'
      allowNull: true,
    },
    lastOrderDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    favoriteLocation: {
      type: DataTypes.INTEGER, // Stores the ID of the favorite location
      allowNull: true,
      references: {
        model: 'Locations',
        key: 'id',
      },
    },
    dietaryPreferences: {
      type: DataTypes.JSONB, // Store dietary preferences like gluten-free, vegan, etc.
      allowNull: true,
    },
    marketingPreferences: {
      type: DataTypes.JSONB, // Store preferences for email, SMS, etc.
      allowNull: true,
    },
    engagementScore: {
      type: DataTypes.FLOAT, // Calculated field based on loyalty points, frequency, etc.
      allowNull: true,
    },
  });

  // Define associations
  GuestProfile.associate = (models) => {
    GuestProfile.hasMany(models.Order, { foreignKey: 'guestId' });
    GuestProfile.belongsTo(models.Location, { foreignKey: 'favoriteLocation' });
    GuestProfile.hasMany(models.LoyaltyTransaction, { foreignKey: 'guestProfileId' });
    GuestProfile.hasMany(models.Review, { foreignKey: 'guestProfileId' });

    // Additional associations for guest data syncs or analytics
    GuestProfile.hasMany(models.AuditLog, { foreignKey: 'guestProfileId' });
  };

  // Business logic or hooks can be added here if needed
  GuestProfile.prototype.calculateEngagementScore = async function () {
    // Example calculation logic based on orders, loyalty points, etc.
    const orders = await this.getOrders();
    if (orders.length > 0) {
      const totalSpend = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      this.engagementScore = (this.loyaltyPoints + totalSpend) / orders.length;
    }
    await this.save();
  };

  return GuestProfile;
};
