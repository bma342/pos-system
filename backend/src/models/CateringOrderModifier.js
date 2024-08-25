module.exports = (sequelize, DataTypes) => {
  const CateringOrderModifier = sequelize.define('CateringOrderModifier', {
    cateringOrderItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CateringOrderItems',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    modifierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Modifiers',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    priceAdjustment: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  CateringOrderModifier.associate = (models) => {
    CateringOrderModifier.belongsTo(models.CateringOrderItem, { foreignKey: 'cateringOrderItemId' });
    CateringOrderModifier.belongsTo(models.Modifier, { foreignKey: 'modifierId' });
  };

  return CateringOrderModifier;
};
