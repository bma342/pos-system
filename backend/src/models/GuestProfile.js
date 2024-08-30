module.exports = (sequelize, DataTypes) => {
  const GuestProfile = sequelize.define('GuestProfile', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
      validate: {
        is: /^\+?[1-9]\d{1,14}$/, // Basic phone number validation
      },
    },
    favoriteMenuItem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numberOfOrders: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    avgOrderSize: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      validate: {
        min: 0,
      },
    },
    loyaltyPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    loyaltyTier: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preferredOrderType: {
      type: DataTypes.ENUM('dine-in', 'pickup', 'delivery'),
      allowNull: true,
    },
    lastOrderDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    favoriteLocation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Locations',
        key: 'id',
      },
    },
    dietaryPreferences: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    marketingPreferences: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    engagementScore: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 100,
      },
    },
  }, {
    tableName: 'GuestProfiles',
    timestamps: true,
  });

  GuestProfile.associate = (models) => {
    if (models.Order) {
      GuestProfile.hasMany(models.Order, { foreignKey: 'guestId' });
    }
    if (models.Location) {
      GuestProfile.belongsTo(models.Location, { foreignKey: 'favoriteLocation' });
    }
    if (models.LoyaltyTransaction) {
      GuestProfile.hasMany(models.LoyaltyTransaction, { foreignKey: 'guestProfileId' });
    }
    if (models.Review) {
      GuestProfile.hasMany(models.Review, { foreignKey: 'guestProfileId' });
    }
    if (models.AuditLog) {
      GuestProfile.hasMany(models.AuditLog, { foreignKey: 'guestProfileId' });
    }
  };

  GuestProfile.prototype.calculateEngagementScore = async function () {
    const orders = await this.getOrders();
    if (orders && orders.length > 0) {
      const totalSpend = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      this.engagementScore = Math.min(100, (this.loyaltyPoints + totalSpend) / orders.length);
      await this.save();
    }
  };

  return GuestProfile;
};
