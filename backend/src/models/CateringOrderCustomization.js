module.exports = (sequelize, DataTypes) => {
  const CateringOrderCustomization = sequelize.define('CateringOrderCustomization', {
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
    customLabel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customizationType: {
      type: DataTypes.STRING, // E.g., 'size', 'extra', 'no', 'substitute'
      allowNull: false,
    },
    priceAdjustment: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0, // Adjustment in price due to customization
    },
  });

  CateringOrderCustomization.associate = (models) => {
    CateringOrderCustomization.belongsTo(models.CateringOrderItem, { foreignKey: 'cateringOrderItemId' });
    CateringOrderCustomization.belongsTo(models.Modifier, { foreignKey: 'modifierId' });
  };

  return CateringOrderCustomization;
};
