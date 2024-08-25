module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define('Discount', {
    posDiscountId: {
      type: DataTypes.STRING, // Store the ID from the POS system
      allowNull: true,
    },
    posDiscountData: {
      type: DataTypes.JSONB, // Store full payload from the POS system
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        // Allow a custom name (vanity) to override the POS name
        this.setDataValue('name', value || this.getDataValue('posDiscountData')?.name || '');
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      set(value) {
        // Allow a custom description (vanity) to override the POS description
        this.setDataValue('description', value || this.getDataValue('posDiscountData')?.description || '');
      },
    },
    type: {
      type: DataTypes.STRING, // 'percentage', 'fixed', 'bogo', etc.
      allowNull: false,
      set(value) {
        // Allow the POS type to be used if a custom one isn’t set
        this.setDataValue('type', value || this.getDataValue('posDiscountData')?.type || 'fixed');
      },
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: true,
      set(value) {
        // Allow the POS value to be used if a custom one isn’t set
        this.setDataValue('value', value || this.getDataValue('posDiscountData')?.value || 0.0);
      },
    },
    conditions: {
      type: DataTypes.JSONB,
      allowNull: true,
      set(value) {
        // Allow custom conditions or use the POS conditions
        this.setDataValue('conditions', value || this.getDataValue('posDiscountData')?.conditions || {});
      },
    },
    cooldownPeriod: {
      type: DataTypes.INTEGER,
      allowNull: true, // In hours
    },
    maxUsesPerGuest: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lastUsedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    locationRestrictions: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
    vanityName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 50],
      },
    },
    vanityDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 100],
      },
    },
    clientControlled: {
      type: DataTypes.BOOLEAN, // Indicates if the discount is fully managed by the client or synced from the POS
      defaultValue: false,
    },
  });

  Discount.associate = (models) => {
    // Enforce tenant isolation with client association
    Discount.belongsTo(models.Client, { foreignKey: 'clientId', allowNull: false });

    // Ensure discounts are wallet-specific
    Discount.belongsTo(models.Wallet, { foreignKey: 'walletId', allowNull: false });

    // Associate with location, allowing discounts to be location-specific
    Discount.belongsTo(models.Location, { foreignKey: 'locationId', allowNull: true });

    // Ensure discounts can be tied to specific orders
    Discount.hasMany(models.Order, { foreignKey: 'discountId', allowNull: true });

    // Allow managers with permissions to override or add vanity layers
    Discount.belongsTo(models.User, { foreignKey: 'createdBy', allowNull: true });
  };

  return Discount;
};
