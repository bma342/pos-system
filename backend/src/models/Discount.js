module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define('Discount', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING, // 'percentage', 'fixed', 'bogo', 'threshold', 'time-based', 'item-based'
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT, // Percentage or fixed value
      allowNull: true,
    },
    conditions: {
      type: DataTypes.JSONB, // e.g., { threshold: 50, bogoItem: "Smoothie" }
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
      defaultValue: 'active', // 'active', 'expired', 'upcoming'
    },
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
      allowNull: true, // Allow null for global discounts
    },
    isGlobal: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indicates if the discount is globally set
    },
    maxUsesPerGuest: {
      type: DataTypes.INTEGER,
      allowNull: true, // Limit how many times a guest can use this discount
    },
    usageCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    itemConditions: {
      type: DataTypes.JSONB, // Conditions for item-based discounts, e.g., { buyQuantity: 3, getQuantity: 1, category: "Drinks" }
      allowNull: true,
    },
  });

  Discount.associate = (models) => {
    Discount.belongsTo(models.Location, { foreignKey: 'locationId' });
    Discount.belongsToMany(models.Item, { through: 'DiscountItems', foreignKey: 'discountId' });
  };

  return Discount;
};
