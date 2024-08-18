module.exports = (sequelize, DataTypes) => {
  const DiscountItem = sequelize.define('DiscountItem', {
    discountId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Discounts',
        key: 'id',
      },
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Items',
        key: 'id',
      },
    },
  });

  return DiscountItem;
};

