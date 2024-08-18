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
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, // Optional for social logins
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
    averageVisitTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preferredPaymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    visitHistory: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    referralSource: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    engagementScore: {
      type: DataTypes.VIRTUAL,
      get() {
        // Calculate the engagement score based on normalized values and weights
        const orderFrequencyScore = this.orderFrequency ? (30 - this.orderFrequency) / 30 : 0;
        const spendScore = this.totalSpend ? this.totalSpend / 1000 : 0; // Assuming max $1000 for full score
        const pointsScore = this.loyaltyPoints ? this.loyaltyPoints / 500 : 0; // Assuming max 500 points for full score
        const visitScore = this.visitHistory ? this.visitHistory.length / 50 : 0; // Assuming 50 visits for full score
        const recencyScore = this.lastOrderDate
          ? (30 - Math.min((Date.now() - new Date(this.lastOrderDate)) / (1000 * 60 * 60 * 24), 30)) / 30
          : 0;

        // Apply weights
        return Math.min(
          (orderFrequencyScore * 0.3 +
            spendScore * 0.3 +
            pointsScore * 0.2 +
            visitScore * 0.1 +
            recencyScore * 0.1) * 100,
          100
        ).toFixed(2); // Capping score at 100
      },
    },
  });

  Guest.associate = (models) => {
    Guest.hasMany(models.Order, { foreignKey: 'guestId' });
    Guest.hasMany(models.OrderHistory, { foreignKey: 'guestId' });
  };

  return Guest;
};
