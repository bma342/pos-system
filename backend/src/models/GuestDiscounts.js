module.exports = (sequelize, DataTypes) => {
  const GuestDiscounts = sequelize.define('GuestDiscounts', {
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Guests',
        key: 'id',
      },
    },
    discountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Discounts',
        key: 'id',
      },
    },
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    useDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  GuestDiscounts.associate = (models) => {
    GuestDiscounts.belongsTo(models.Guest, { foreignKey: 'guestId' });
    GuestDiscounts.belongsTo(models.Discount, { foreignKey: 'discountId' });
  };

  return GuestDiscounts;
};
